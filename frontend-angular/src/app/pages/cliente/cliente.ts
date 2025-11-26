import { Component } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../shared/services/cliente.service';
import {
    GridAction,
    ReusableDatagridComponent,
} from '../../shared/components/reusable-datagrid/reusable-datagrid';
import { AddButtonComponent } from '../../shared/components/add-button/add-button';
import { PopupFormComponent } from '../../shared/components/popup-form/popup-form';
import { DxTextBoxComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';

@Component({
    selector: 'app-cliente',
    imports: [
        ReusableDatagridComponent,
        AddButtonComponent,
        PopupFormComponent,
        DxTextBoxComponent,
    ],
    templateUrl: './cliente.html',
    styleUrl: './cliente.scss',
})
export class ClienteComponent {
    /** Lista exibida na grid */
    clientes: Cliente[] = [];

    /** Modelo do formulário */
    formCliente: Cliente = new Cliente();

    /** Configuração das colunas da grid */
    readonly clienteColumns = [
        { dataField: 'codigo', caption: 'Código', width: 90, hidingPriority: 2 },
        { dataField: 'nome', caption: 'Nome', hidingPriority: 8 },
    ];

    /** Controle do popup */
    popupVisible = false;

    /** Indica se o popup está no modo edição */
    isEdit = false;

    constructor(private clienteService: ClienteService) {}

    ngOnInit(): void {
        this.loadClientes();
    }

    /** Carrega a lista de clientes */
    private loadClientes(): void {
        this.clienteService.getClientes().subscribe({
            next: (clientes) => (this.clientes = clientes),
            error: () => notify('Erro ao carregar clientes.', 'error', 3000),
        });
    }

    /** Abre o popup para cadastro */
    openRegisterPopup(): void {
        this.isEdit = false;
        this.formCliente = new Cliente();
        this.popupVisible = true;
    }

    /** Fecha o popup */
    closePopup(): void {
        this.popupVisible = false;
    }

    /** Abre popup no modo edição */
    startEditing(cliente: Cliente): void {
        this.isEdit = true;
        this.formCliente = { ...cliente }; // Clone do objeto
        this.popupVisible = true;
    }

    /** Valida os dados antes de salvar ou atualizar */
    private validateCliente(): boolean {
        const { codigo, nome } = this.formCliente;

        // Validação simples de campos obrigatórios
        if (!codigo || codigo.toString().trim() === '') {
            notify('O campo Código é obrigatório.', 'warning', 3000);
            return false;
        }

        if (!nome || nome.trim() === '') {
            notify('O campo Nome é obrigatório.', 'warning', 3000);
            return false;
        }

        // Verificar duplicidade de código
        const codigoDuplicado = this.clientes.some(
            (c) => c.codigo === codigo && c.id !== this.formCliente.id
        );

        if (codigoDuplicado) {
            notify('Já existe um cliente cadastrado com este código.', 'error', 4000);
            return false;
        }

        return true;
    }

    /** Salva ou atualiza de acordo com o estado */
    saveOrUpdateCliente(): void {
        if (!this.validateCliente()) {
            return;
        }

        this.isEdit ? this.updateCliente() : this.saveCliente();
    }

    /** Salvar cliente */
    private saveCliente(): void {
        this.clienteService.saveCliente(this.formCliente).subscribe({
            next: () => {
                notify(`Cliente ${this.formCliente.nome} salvo com sucesso.`, 'success', 3000);
                this.afterSave();
            },
            error: (e) => {
                notify(`Erro ao salvar cliente: ${e.message}.`, 'error', 5000);
            },
        });
    }

    /** Atualizar cliente */
    private updateCliente(): void {
        this.clienteService.updateCliente(this.formCliente).subscribe({
            next: () => {
                notify(`Cliente ${this.formCliente.nome} atualizado com sucesso.`, 'success', 3000);
                this.afterSave();
            },
            error: (e) => {
                notify(`Erro ao atualizar cliente: ${e.message}.`, 'error', 5000);
            },
        });
    }

    /** Ações após salvar ou atualizar */
    private afterSave(): void {
        this.popupVisible = false;
        this.loadClientes();
    }

    /** Solicita confirmação para excluir */
    confirmDeletion(cliente: Cliente): void {
        confirm(
            `Deseja realmente excluir o cliente <b>${cliente.nome}</b> (Código: ${cliente.codigo})?`,
            'Confirmação de Exclusão'
        ).then((accepted) => accepted && this.deleteCliente(cliente));
    }

    /** Exclui o cliente */
    private deleteCliente(cliente: Cliente): void {
        this.clienteService.deleteCliente(cliente.id).subscribe({
            next: () => {
                notify(`Cliente ${cliente.nome} excluído com sucesso.`, 'success', 3000);
                this.loadClientes();
            },
            error: (e) => {
                notify(`Erro ao excluir cliente: ${e.message}`, 'error', 5000);
            },
        });
    }

    /** Ações emitidas da grid (editar/deletar) */
    handleGridAction(event: GridAction): void {
        const actions: Record<string, (data: Cliente) => void> = {
            edit: (data) => this.startEditing(data),
            delete: (data) => this.confirmDeletion(data),
        };

        actions[event.type]?.(event.data);
    }
}

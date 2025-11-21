import { Component } from '@angular/core';
import {Cliente} from "../../models/cliente";
import {ClienteService} from "../../shared/services/cliente.service";
import {GridAction, ReusableDatagridComponent} from "../../shared/components/reusable-datagrid/reusable-datagrid";
import {AddButtonComponent} from "../../shared/components/add-button/add-button";
import {PopupFormComponent} from "../../shared/components/popup-form/popup-form";
import {DxTextBoxComponent} from "devextreme-angular";
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

    // Array objeto cliente
    cliente: Cliente[] = [];

    // Instancia do novo objeto Cliente
    newCliente: Cliente = new Cliente();

    // Colunas do datagrid
    clienteColumns: any[] = [
        { dataField: 'codigo', caption: 'Código', width: 90, hidingPriority: 2 },
        { dataField: 'nome', caption: 'Nome', hidingPriority: 8 },
    ]

    // Controla visibilidade do popup
    popupVisible: boolean = false;

    // Estado do popup cadastro/edição
    isEdit: boolean = false;

    constructor(private service: ClienteService) { }

    ngOnInit() {
        this.loadClientes()
    }

    // Carrega lista de clientes na grid
    loadClientes() {
        this.service.getClientes().subscribe((e) => {
            this.cliente = e;
        });
    }

    // Abre popup para novo registro
    openRegisterPopup() {
        this.popupVisible = true;
        this.isEdit = false;
        this.newCliente = new Cliente();
    }

    // Fecha o popup
    closePopup() {
        this.popupVisible = false;
    }

    // Abre popup no modo edição e carrega os dados
    startEditing(cliente: Cliente) {
        this.popupVisible = true;
        this.isEdit = true;
        this.newCliente = {...cliente};
    }

    // Salva ou atualiza o objeto cliente dependendo do estado do popup
    saveOrUpdateCliente() {
        if (this.isEdit) {
            this.service.updateCliente(this.newCliente).subscribe({
                next: () => {
                    this.popupVisible = false;
                    this.loadClientes();
                    notify(`Cliente ${this.newCliente.nome} atualizado com sucesso.`, 'success', 3000);
                },
                error: (e) => {
                    notify(`Erro ao atualizar cliente: ${e.message}.`, 'error', 5000);
                }
            })
        } else {
            this.service.saveCliente(this.newCliente).subscribe({
                next: () => {
                    this.popupVisible = false;
                    this.loadClientes()
                    notify(`Cliente ${this.newCliente.nome} salvo com sucesso.`, 'success', 3000);
                },
                error: (e) => {
                    notify(`Erro ao salvar cliente: ${e.message}.`, 'error', 5000);
                }
            })
        }
    }

    // Confirma a exclusão do objeto cliente
    confirmDeletion(cliente: Cliente) {
        const message = `Deseja realmente excluir o cliente <b>${cliente.nome}</b> (Código: ${cliente.codigo})?`;
        const title = "Confirmação de Exclusão";

        confirm(message, title).then((dialogResult) => {
            if (dialogResult) {
                this.deleteCliente(cliente);
            }
        });
    }

    // Exclui o objeto cliente
    deleteCliente(cliente: Cliente) {
        this.service.deleteCliente(cliente.id).subscribe({
            next: () => {
                this.loadClientes();
                notify(`Cliente ${cliente.nome} excluído com sucesso.`, 'success', 3000);
            },
            error: (e) => {
                notify(`Erro ao excluir cliente: ${e.message}`, 'error', 5000);
            }
        });
    }

    // Identifica qual ação deve ser disparada
    handleGridAction(event: GridAction) {
        if (event.type === 'edit') {
            this.startEditing(event.data);
        } else if (event.type === 'delete') {
            this.confirmDeletion(event.data);
        }
    }
}

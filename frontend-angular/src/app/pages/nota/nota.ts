import { Component } from '@angular/core';
import { NotaFiscal } from '../../models/notaFiscal';
import { Cliente } from '../../models/cliente';
import { Item } from '../../models/item';
import { ItemNota } from '../../models/itemNota';
import { NotaFiscalService } from '../../shared/services/notaFiscal.service';
import { ClienteService } from '../../shared/services/cliente.service';
import { ItemService } from '../../shared/services/item.service';

import {
    GridAction,
    ReusableDatagridComponent,
} from '../../shared/components/reusable-datagrid/reusable-datagrid';
import { AddButtonComponent } from '../../shared/components/add-button/add-button';
import { PopupFormComponent } from '../../shared/components/popup-form/popup-form';

import {
    DxSelectBoxComponent,
    DxDateBoxComponent,
    DxDataGridComponent,
    DxNumberBoxComponent,
} from 'devextreme-angular';
import { DxiColumnComponent, DxiButtonComponent } from 'devextreme-angular/ui/nested';

import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';
import {CurrencyPipe} from "@angular/common";

@Component({
    selector: 'app-nota',
    imports: [
        ReusableDatagridComponent,
        AddButtonComponent,
        PopupFormComponent,
        DxSelectBoxComponent,
        DxDateBoxComponent,
        DxNumberBoxComponent,
        DxDataGridComponent,
        DxiColumnComponent,
        DxiButtonComponent,
        CurrencyPipe,
    ],
    templateUrl: './nota.html',
    styleUrl: './nota.scss',
})
export class NotaComponent {
    /** Lista exibida na grid */
    notas: NotaFiscal[] = [];

    /** Modelo do formulário */
    formNota: NotaFiscal = this.newNota();

    /** Lista auxiliar para selects */
    clientes: Cliente[] = [];
    itensDisponiveis: Item[] = [];

    /** Controle do popup */
    popupVisible = false;

    /** Indica se o popup está no modo edição */
    isEdit = false;

    /** Total calculado dinamicamente */
    totalNota = 0;

    /** Colunas da grid */
    readonly notaColumns = [
        { dataField: 'numeroNota', caption: 'Número', width: 90, hidingPriority: 1 },
        { dataField: 'dataEmissao', caption: 'Data de Emissão', width: 150, dataType: 'date', format: 'dd/MM/yyyy', editorOptions: { type: 'date' }, filterOperations: ['=', 'between'], hidingPriority: 2 },
        { dataField: 'cliente.nome', caption: 'Cliente', hidingPriority: 3 },
        { caption: 'Valor Total', dataType: 'number', alignment: 'right', format: { type: 'currency', precision: 2, currency: 'BRL' }, calculateCellValue: (data: NotaFiscal) => this.calculateNotaTotal(data), hidingPriority: 4,},
    ];

    constructor(
        private notaService: NotaFiscalService,
        private clienteService: ClienteService,
        private itemService: ItemService
    ) {}

    ngOnInit(): void {
        this.loadNotas();
        this.loadAuxiliaryData();
    }

    /** Retorna um novo objeto NotaFiscal */
    private newNota(): NotaFiscal {
        return {
            numeroNota: 0,
            dataEmissao: new Date(),
            cliente: {} as Cliente,
            itens: [],
        } as NotaFiscal;
    }

    /** Carrega lista da grid */
    private loadNotas(): void {
        this.notaService.getNotasFiscais().subscribe({
            next: (lista) => (this.notas = lista),
            error: () => notify('Erro ao carregar notas fiscais.', 'error', 3000),
        });
    }

    /** Carrega clientes e itens */
    private loadAuxiliaryData(): void {
        this.clienteService.getClientes().subscribe({
            next: (c) => (this.clientes = c),
        });

        this.itemService.getItens().subscribe({
            next: (i) => (this.itensDisponiveis = i),
        });
    }

    /** Abre o popup para registro */
    openRegisterPopup(): void {
        this.isEdit = false;
        this.formNota = this.newNota();
        this.totalNota = 0;
        this.popupVisible = true;
    }

    /** Fecha popup */
    closePopup(): void {
        this.popupVisible = false;
    }

    /** Abre popup no modo edição */
    startEditing(nota: NotaFiscal): void {
        this.isEdit = true;

        this.formNota = {
            ...nota,
            itens: [...nota.itens],
        };

        this.updateTotalNota();
        this.popupVisible = true;
    }

    /** Verifica se os dados da nota são válidos */
    private validateNota(): boolean {
        if (!this.formNota.numeroNota || this.formNota.numeroNota <= 0) {
            notify('O número da nota é obrigatório.', 'warning', 3000);
            return false;
        }

        if (!this.formNota.cliente?.id) {
            notify('Selecione um cliente.', 'warning', 3000);
            return false;
        }

        if (this.formNota.itens.length === 0) {
            notify('Adicione ao menos um item à nota.', 'warning', 3000);
            return false;
        }

        return true;
    }

    /** Monta o payload para API */
    private buildPayload(): any {
        return {
            numeroNota: this.formNota.numeroNota,
            dataEmissao: this.formNota.dataEmissao,
            cliente: { id: this.formNota.cliente.id },
            itens: this.formNota.itens.map((i) => ({
                sequencial: i.sequencial,
                quantidade: i.quantidade,
                itemNota: { id: i.itemNota.id },
            })),
        };
    }

    /** Salva ou atualiza */
    saveOrUpdateNota(): void {
        if (!this.validateNota()) return;

        this.isEdit ? this.updateNota() : this.saveNota();
    }

    /** Salvar */
    private saveNota(): void {
        this.notaService.saveNotaFiscal(this.buildPayload()).subscribe({
            next: () => {
                notify(`Nota Nº ${this.formNota.numeroNota} salva com sucesso.`, 'success', 3000);
                this.afterSave();
            },
            error: (e) => notify(`Erro ao salvar nota: ${e.message}`, 'error', 5000),
        });
    }

    /** Atualizar */
    private updateNota(): void {
        if (!this.formNota.id) {
            notify('Erro: ID da nota não informado.', 'error', 3000);
            return;
        }

        this.notaService.updateNotaFiscal(this.formNota.id, this.buildPayload()).subscribe({
            next: () => {
                notify(`Nota Nº ${this.formNota.numeroNota} atualizada com sucesso.`, 'success', 3000);
                this.afterSave();
            },
            error: (e) => notify(`Erro ao atualizar nota: ${e.message}`, 'error', 5000),
        });
    }

    /** Após salvar ou atualizar */
    private afterSave(): void {
        this.popupVisible = false;
        this.loadNotas();
    }

    /** Confirma exclusão */
    confirmDeletion(nota: NotaFiscal): void {
        confirm(
            `Deseja realmente excluir a Nota Fiscal Nº <b>${nota.numeroNota}</b>?`,
            'Confirmação de Exclusão'
        ).then((accepted) => accepted && this.deleteNota(nota));
    }

    /** Exclui a nota */
    private deleteNota(nota: NotaFiscal): void {
        if (!nota.id) {
            notify('Erro: ID da nota é obrigatório para excluir.', 'error', 3000);
            return;
        }

        this.notaService.deleteNotaFiscal(nota.id).subscribe({
            next: () => {
                notify(`Nota Nº ${nota.numeroNota} excluída com sucesso.`, 'success', 3000);
                this.loadNotas();
            },
            error: (e) => notify(`Erro ao excluir nota: ${e.message}`, 'error', 5000),
        });
    }

    /** Handler das ações da grid */
    handleGridAction(event: GridAction): void {
        const actions: Record<string, (data: NotaFiscal) => void> = {
            edit: (data) => this.startEditing(data),
            delete: (data) => this.confirmDeletion(data),
        };

        actions[event.type]?.(event.data);
    }

    /** Adiciona item à nota */
    onSelectItem(e: any): void {
        const idItem = e.value;
        if (!idItem) return;

        const item = this.itensDisponiveis.find((i) => i.id === idItem);
        if (!item) return;

        const jaExiste = this.formNota.itens.some((i) => i.itemNota.id === idItem);

        if (jaExiste) {
            notify('Este item já foi adicionado!', 'warning', 2000);
            return;
        }

        const sequencial = this.formNota.itens.length + 1;

        const novoItem: ItemNota = {
            id: 0,
            sequencial,
            quantidade: 1,
            itemNota: item,
            valorTotal: item.valorUnitario,
        };

        this.formNota.itens.push(novoItem);
        this.updateTotalNota();
        e.component.reset();
    }

    /** Evento disparado ao alterar o cliente no SelectBox */
    onClienteChanged(e: any): void {
        const selectedClient = this.clientes.find(c => c.id === e.value);

        if (!selectedClient) {
            notify('Cliente inválido ou inexistente.', 'warning', 3000);
            return;
        }

        this.formNota.cliente = selectedClient;
    }

    /** Atualiza valor total ao alterar quantidade */
    onCellValueChanged(e: any): void {
        const item = e.data;
        if (!item) return;

        item.valorTotal = item.itemNota.valorUnitario * item.quantidade;
        this.updateTotalNota();
    }

    /** Recalcula total da nota */
    updateTotalNota(): void {
        this.totalNota = this.formNota.itens.reduce((sum, i) => sum + i.valorTotal, 0);
    }

    /** Calcula total da nota (usado pela grid) */
    private calculateNotaTotal(nota: NotaFiscal): number {
        return nota.itens?.reduce((sum, i) => sum + (i.valorTotal || 0), 0) ?? 0;
    }
}

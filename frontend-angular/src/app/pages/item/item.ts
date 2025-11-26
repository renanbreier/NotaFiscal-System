import { Component } from '@angular/core';
import { Item } from '../../models/item';
import { ItemService } from '../../shared/services/item.service';
import {
    GridAction,
    ReusableDatagridComponent,
} from '../../shared/components/reusable-datagrid/reusable-datagrid';
import { AddButtonComponent } from '../../shared/components/add-button/add-button';
import { PopupFormComponent } from '../../shared/components/popup-form/popup-form';
import { DxTextBoxComponent, DxNumberBoxComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';

@Component({
    selector: 'app-item',
    imports: [
        ReusableDatagridComponent,
        AddButtonComponent,
        PopupFormComponent,
        DxTextBoxComponent,
        DxNumberBoxComponent,
    ],
    templateUrl: './item.html',
    styleUrl: './item.scss',
})
export class ItemComponent {
    /** Lista exibida na grid */
    itens: Item[] = [];

    /** Modelo do formulário */
    formItem: Item = new Item();

    /** Configuração das colunas da grid */
    readonly itemColumns = [
        { dataField: 'codigo', caption: 'Código', width: 90, hidingPriority: 2 },
        { dataField: 'descricao', caption: 'Descrição', hidingPriority: 5 },
        { dataField: 'valorUnitario', caption: 'Valor Unitário', format: {type: 'currency', precision: 2, currency: 'BRL'}, width: 140 },
    ];

    /** Controle do popup */
    popupVisible = false;

    /** Indica se o popup está no modo edição */
    isEdit = false;

    constructor(private itemService: ItemService) {}

    ngOnInit(): void {
        this.loadItens();
    }

    /** Carrega a lista */
    private loadItens(): void {
        this.itemService.getItens().subscribe({
            next: (itens) => (this.itens = itens),
            error: () => notify('Erro ao carregar itens.', 'error', 3000),
        });
    }

    /** Abre o popup para cadastrar */
    openRegisterPopup(): void {
        this.isEdit = false;
        this.formItem = new Item();
        this.popupVisible = true;
    }

    /** Fecha o popup */
    closePopup(): void {
        this.popupVisible = false;
    }

    /** Abre popup no modo edição */
    startEditing(item: Item): void {
        this.isEdit = true;
        this.formItem = { ...item };
        this.popupVisible = true;
    }

    /** Valida os dados antes de salvar ou atualizar */
    private validateItem(): boolean {
        const { codigo, descricao, valorUnitario } = this.formItem;

        if (!codigo || codigo.toString().trim() === '') {
            notify('O campo Código é obrigatório.', 'warning', 3000);
            return false;
        }

        if (!descricao || descricao.trim() === '') {
            notify('O campo Descrição é obrigatório.', 'warning', 3000);
            return false;
        }

        if (valorUnitario == null || valorUnitario <= 0) {
            notify('O Valor Unitário deve ser maior que 0.', 'warning', 3000);
            return false;
        }

        // Verificar duplicidade de código
        const codigoDuplicado = this.itens.some(
            (i) => i.codigo === codigo && i.id !== this.formItem.id
        );

        if (codigoDuplicado) {
            notify('Já existe um item cadastrado com este código.', 'error', 4000);
            return false;
        }

        return true;
    }

    /** Salva ou atualiza o item */
    saveOrUpdateItem(): void {
        if (!this.validateItem()) {
            return;
        }

        this.isEdit ? this.updateItem() : this.saveItem();
    }

    /** Salvar */
    private saveItem(): void {
        this.itemService.saveItem(this.formItem).subscribe({
            next: () => {
                notify(`Item ${this.formItem.descricao} salvo com sucesso.`, 'success', 3000);
                this.afterSave();
            },
            error: (e) => notify(`Erro ao salvar item: ${e.message}`, 'error', 5000),
        });
    }

    /** Atualizar */
    private updateItem(): void {
        this.itemService.updateItem(this.formItem).subscribe({
            next: () => {
                notify(`Item ${this.formItem.descricao} atualizado com sucesso.`, 'success', 3000);
                this.afterSave();
            },
            error: (e) => notify(`Erro ao atualizar item: ${e.message}`, 'error', 5000),
        });
    }

    /** Ações após salvar */
    private afterSave(): void {
        this.popupVisible = false;
        this.loadItens();
    }

    /** Solicita confirmação para excluir */
    confirmDeletion(item: Item): void {
        confirm(
            `Deseja realmente excluir o item <b>${item.descricao}</b> (Código: ${item.codigo})?`,
            'Confirmação de Exclusão'
        ).then((accepted) => accepted && this.deleteItem(item));
    }

    /** Exclui o item */
    private deleteItem(item: Item): void {
        this.itemService.deleteItem(item.id).subscribe({
            next: () => {
                notify(`Item ${item.descricao} excluído com sucesso.`, 'success', 3000);
                this.loadItens();
            },
            error: (e) => notify(`Erro ao excluir item: ${e.message}`, 'error', 5000),
        });
    }

    /** Handler para ações da grid */
    handleGridAction(event: GridAction): void {
        const actions: Record<string, (data: Item) => void> = {
            edit: (data) => this.startEditing(data),
            delete: (data) => this.confirmDeletion(data),
        };

        actions[event.type]?.(event.data);
    }
}
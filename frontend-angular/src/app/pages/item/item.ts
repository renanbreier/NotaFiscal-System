import { Component } from '@angular/core';
import { Item } from '../../models/item';
import {ItemService} from "../../shared/services/item.service";
import {GridAction, ReusableDatagridComponent} from "../../shared/components/reusable-datagrid/reusable-datagrid";
import notify from "devextreme/ui/notify";
import { confirm } from 'devextreme/ui/dialog';
import {PopupFormComponent} from "../../shared/components/popup-form/popup-form";
import {DxNumberBoxComponent, DxTextBoxComponent} from "devextreme-angular";
import {AddButtonComponent} from "../../shared/components/add-button/add-button";

@Component({
  selector: 'app-item',
    imports: [
        ReusableDatagridComponent,
        PopupFormComponent,
        DxTextBoxComponent,
        DxNumberBoxComponent,
        AddButtonComponent
    ],
  templateUrl: './item.html',
  styleUrl: './item.scss',
})
export class ItemComponent {

    // Array objeto item
    item: Item[] = [];

    // Instancia no novo objeto item
    newItem: Item = new Item();

    // Colunas do datagrid
    itemColumns: any[] = [
        { dataField: 'codigo', caption: 'Código', width: 90, hidingPriority: 1 },
        { dataField: 'descricao', caption: 'Descrição', hidingPriority: 2 },
        { dataField: 'valorUnitario', caption: 'Valor', width: 120, hidingPriority: 2, dataType: 'number', format: 'currency', alignment: 'left' },
    ]

    // Controla visibilidade do popup
    popupVisible: boolean = false;

    // Estado do popup cadastro/edição
    isEdit: boolean = false;

    constructor(private service: ItemService) { }

    ngOnInit() {
        this.loadItems();
    }

    // Carrega a lista de itens na grid
    loadItems() {
        this.service.getItens().subscribe((e) => {
            this.item = e;
        })
    }

    // Abre popup para novo registro
    openRegisterPopup() {
        this.popupVisible = true;
        this.isEdit = false;
        this.newItem = new Item();
    }

    // Fecha o popup
    closePopup() {
        this.popupVisible = false;
    }

    // Abre popup no modo edição e carrega os dados
    startEditing(item: Item) {
        this.popupVisible = true;
        this.isEdit = true;
        this.newItem = {...item};
    }

    // Salva ou atualiza o objeto item dependendo do estado do popup
    saveOrUpdateItem() {
        if (this.isEdit) {
            this.service.updateItem(this.newItem).subscribe({
                next: () => {
                    this.popupVisible = false;
                    this.loadItems();
                    notify(`Item ${this.newItem.descricao} atualizado com sucesso.`, 'success', 3000);
                },
                error: (e) => {
                    notify(`Erro ao atualizar item: ${e.message}.`, 'error', 5000);
                }
            })
        } else {
            this.service.saveItem(this.newItem).subscribe({
                next: () => {
                    this.popupVisible = false;
                    this.loadItems();
                    notify(`Item ${this.newItem.descricao} salvo com sucesso.`, 'success', 3000);
                },
                error: (e) => {
                    notify(`Erro ao salvar item: ${e.message}.`, 'error', 5000);
                }
            })
        }
    }

    // Confirma a exclusão do objeto item
    confirmDeletion(item: Item) {
        const message = `Deseja realmente excluir o item <b>${item.descricao}</b> (Código: ${item.codigo})?`;
        const title = "Confirmação de Exclusão";

        confirm(message, title).then((dialogResult) => {
            if (dialogResult) {
                this.deleteItem(item);
            }
        });
    }

    // Exclui o objeto item
    deleteItem(item: Item) {
        this.service.deleteItem(item.id).subscribe({
            next: () => {
                this.loadItems();
                notify(`Item ${item.descricao} excluído com sucesso.`, 'success', 3000);
            },
            error: (e) => {
                notify(`Erro ao excluir item: ${e.message}`, 'error', 5000);
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

import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DxDataGridComponent} from "devextreme-angular";
import {
    DxiDataGridColumnComponent,
    DxoDataGridFilterRowComponent,
    DxoDataGridPagerComponent,
    DxoDataGridPagingComponent, DxoDataGridSortingComponent
} from "devextreme-angular/ui/data-grid";
import {DxButtonModule} from "devextreme-angular/ui/button";

// Interface com as ações da grid
export interface GridAction {
    type: 'edit' | 'delete';
    data: any;
}

@Component({
  selector: 'app-reusable-datagrid',
    imports: [
        CommonModule,
        DxDataGridComponent,
        DxoDataGridPagingComponent,
        DxoDataGridPagerComponent,
        DxoDataGridFilterRowComponent,
        DxoDataGridSortingComponent,
        DxiDataGridColumnComponent,
        DxButtonModule
    ],
  templateUrl: './reusable-datagrid.html',
  styleUrl: './reusable-datagrid.scss',
})

export class ReusableDatagridComponent implements OnInit {

    // Datasource da grid
    @Input() dataSource: any[] = [];

    // Colunas da grid
    @Input() columns: any[] = [];

    // Chave para ordenação
    @Input() keyField: string = 'id';

    // Propriedades opcionais da grid
    @Input() showBorders: boolean = false;
    @Input() pageSize: number = 10;
    @Input() allowFiltering: boolean = true;
    @Input() allowSorting: boolean = true;

    // Propriedades das ações
    @Input() showActions: boolean = false;
    @Input() actionsCaption: string = 'Ações';
    @Input() actionsWidth: number = 120;

    // Propriedades do botão editar
    @Input() editButtonIcon: string = 'edit';
    @Input() editButtonType: string = 'default';
    @Input() editButtonHint : string = 'Editar';
    @Input() editButtonStyle: string = 'margin-left: 5px;'

    // Propriedades do botão delete
    @Input() deleteButtonIcon: string = 'trash';
    @Input() deleteButtonType: string = 'danger';
    @Input() deleteButtonHint : string = 'Excluir';
    @Input() deleteButtonStyle: string = 'margin-left: 5px;'

    // Evento quando clicar no botão de edit/delete
    @Output() actionClicked = new EventEmitter<GridAction>();

    constructor() {}

    ngOnInit(): void {}

    // Metodo para identificar o click
    onActionClick(type: 'edit' | 'delete', data: any) {
        this.actionClicked.emit({type, data});
    }
}

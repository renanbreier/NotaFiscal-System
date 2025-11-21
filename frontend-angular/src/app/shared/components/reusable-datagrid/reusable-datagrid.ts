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

    // Dados da Grid
    @Input() dataSource: any[] = [];

    // Definição das colunas
    @Input() columns: any[] = [];

    // Chave de identificação
    @Input() keyField: string = 'id';

    // Propriedades opcionais
    @Input() showBorders: boolean = false;
    @Input() pageSize: number = 10;
    @Input() allowFiltering: boolean = true;
    @Input() allowSorting: boolean = true;

    // Propriedades actions
    @Input() showActions: boolean = false;
    @Input() actionsCaption: string = 'Ações';
    @Input() actionsWidth: number = 120;

    // Evento quando clicar no button
    @Output() actionClicked = new EventEmitter<GridAction>();

    constructor() {}

    ngOnInit(): void {}

    onActionClick(type: 'edit' | 'delete', data: any) {
        this.actionClicked.emit({type, data});
    }
}

import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DxDataGridComponent} from "devextreme-angular";
import {
    DxiDataGridColumnComponent,
    DxoDataGridFilterRowComponent,
    DxoDataGridPagerComponent,
    DxoDataGridPagingComponent, DxoDataGridSortingComponent
} from "devextreme-angular/ui/data-grid";

@Component({
  selector: 'app-reusable-datagrid',
    imports: [
        CommonModule,
        DxDataGridComponent,
        DxoDataGridPagingComponent,
        DxoDataGridPagerComponent,
        DxoDataGridFilterRowComponent,
        DxoDataGridSortingComponent,
        DxiDataGridColumnComponent
    ],
  templateUrl: './reusable-datagrid.html',
  styleUrl: './reusable-datagrid.scss',
})
export class ReusableDatagrid implements OnInit {

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

    constructor() {}

    ngOnInit(): void {}
}

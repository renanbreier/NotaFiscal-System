import { Component } from '@angular/core';
import {DxButtonComponent, DxDataGridComponent} from 'devextreme-angular';
import {
  DxiDataGridColumnComponent,
  DxoDataGridFilterRowComponent,
  DxoDataGridLookupComponent, DxoDataGridPagerComponent, DxoDataGridPagingComponent
} from 'devextreme-angular/ui/data-grid';

@Component({
  selector: 'app-cliente',
  imports: [
    DxDataGridComponent,
    DxiDataGridColumnComponent,
    DxoDataGridFilterRowComponent,
    DxoDataGridLookupComponent,
    DxoDataGridPagerComponent,
    DxoDataGridPagingComponent,
    DxButtonComponent
  ],
  templateUrl: './cliente.html',
  styleUrl: './cliente.scss',
})
export class ClienteComponent {
  dataSource: any;
  priority: any[];

  constructor() {
    this.dataSource = {
      store: {
        version: 2,
        type: 'odata',
        key: 'Task_ID',
        url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks'
      },
      expand: 'ResponsibleEmployee',
      select: [
        'Task_ID',
        'Task_Subject',
        'Task_Start_Date',
        'Task_Due_Date',
        'Task_Status',
        'Task_Priority',
        'Task_Completion',
        'ResponsibleEmployee/Employee_Full_Name'
      ]
    };
    this.priority = [
      { name: 'High', value: 4 },
      { name: 'Urgent', value: 3 },
      { name: 'Normal', value: 2 },
      { name: 'Low', value: 1 }
    ];
  }
}

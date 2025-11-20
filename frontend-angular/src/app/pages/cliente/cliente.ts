import { Component } from '@angular/core';
import {Cliente} from "../../models/cliente";
import {ApiNotaService} from "../../shared/services/api-nota.service";
import {ReusableDatagrid} from "../../shared/components/reusable-datagrid/reusable-datagrid";

@Component({
  selector: 'app-cliente',
  imports: [
      ReusableDatagrid
  ],
  templateUrl: './cliente.html',
  styleUrl: './cliente.scss',
})
export class ClienteComponent {

    cliente: Cliente[] = [];

    clienteColumns: any[] = [
        { dataField: 'codigo', caption: 'Código', width: 90, hidingPriority: 2 },
        { dataField: 'nome', caption: 'Nome', width: 200, hidingPriority: 8 },
    ]

    constructor(private service: ApiNotaService) { }

    ngOnInit() {
        this.service.getClientes().subscribe((e) => {
            this.cliente = e;
        });
    }
}

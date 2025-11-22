import { Component } from '@angular/core';
import {AddButtonComponent} from "../../shared/components/add-button/add-button";
import {NotaFiscal} from "../../models/notaFiscal";
import {ReusableDatagridComponent} from "../../shared/components/reusable-datagrid/reusable-datagrid";
import {NotaFiscalService} from "../../shared/services/notaFiscal.service";

@Component({
  selector: 'app-nota',
    imports: [
        AddButtonComponent,
        ReusableDatagridComponent
    ],
  templateUrl: './nota.html',
  styleUrl: './nota.scss',
})
export class NotaComponent {

    // Array objeto nota
    nota: NotaFiscal[] = [];

    // Instancia do novo objeto nota
    newNota: NotaFiscal = new NotaFiscal();

    // Colunas do datagrid
    notaColumns: any[] = [
        { dataField: 'numeroNota', caption: 'Número', width: 90, hidingPriority: 1 },
        { dataField: 'dataEmissao', caption: 'Data de Emissão', hidingPriority: 2 },
        { dataField: 'cliente.nome', caption: 'Cliente', hidingPriority: 3 },
        { caption: 'Valor total', dataType: 'number', format: 'currency', alignment: 'right', calculateCellValue: (data: any) => this.calculateNotaTotal(data), hidingPriority: 4 },
    ]

    // Controla visibilidade do popup
    popupVisible: boolean = false;

    // Estado do popup cadastro/edição
    isEdit: boolean = false;

    constructor(private service: NotaFiscalService) { }

    ngOnInit() {
        this.loadItems();
    }

    // Carrega a lista de notas na grid
    loadItems() {
        this.service.getNotasFiscais().subscribe((e) => {
            this.nota = e;
        })
    }

    // Calcula o valor total da nota fiscal
    calculateNotaTotal(nota: NotaFiscal): number {
        if (!nota.itens || !Array.isArray(nota.itens) || nota.itens.length === 0) {
            return 0;
        }
        return nota.itens.reduce((sum, item) => sum + (+item.valorTotal || 0), 0);
    }
}

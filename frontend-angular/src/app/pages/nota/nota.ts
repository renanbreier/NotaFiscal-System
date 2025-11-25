import { Component } from '@angular/core';
import {AddButtonComponent} from "../../shared/components/add-button/add-button";
import {NotaFiscal} from "../../models/notaFiscal";
import {GridAction, ReusableDatagridComponent} from "../../shared/components/reusable-datagrid/reusable-datagrid";
import {NotaFiscalService} from "../../shared/services/notaFiscal.service";
import {
    DxDataGridComponent,
    DxDateBoxComponent,
    DxNumberBoxComponent,
    DxSelectBoxComponent,
} from "devextreme-angular";
import {PopupFormComponent} from "../../shared/components/popup-form/popup-form";
import {Item} from "../../models/item";
import notify from "devextreme/ui/notify";
import {
    DxiButtonComponent,
    DxiColumnComponent,
} from "devextreme-angular/ui/nested";
import {Cliente} from "../../models/cliente";
import {ItemNota} from "../../models/itemNota";
import {ClienteService} from "../../shared/services/cliente.service";
import {ItemService} from "../../shared/services/item.service";
import {confirm} from "devextreme/ui/dialog";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-nota',
    imports: [
        AddButtonComponent,
        ReusableDatagridComponent,
        DxNumberBoxComponent,
        PopupFormComponent,
        DxDateBoxComponent,
        DxSelectBoxComponent,
        DxDataGridComponent,
        DxiColumnComponent,
        CurrencyPipe,
        DxiButtonComponent
    ],
  templateUrl: './nota.html',
  styleUrl: './nota.scss',
})
export class NotaComponent {

    // Array objeto nota
    nota: NotaFiscal[] = [];

    // Instancia do novo objeto nota
    newNota: NotaFiscal = this.initializeNewNota();
    totalNota: number = 0;

    // Instancia dos objetos Cliente/Item
    clientes: Cliente[] = [];
    itensDisponiveis: Item[] = [];

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

    constructor(private service: NotaFiscalService, private clienteService: ClienteService, private itemService: ItemService) { }

    ngOnInit() {
        this.loadNotas();
        this.loadAuxiliaryData();
    }

    // Carrega a lista de notas na grid
    loadNotas() {
        this.service.getNotasFiscais().subscribe((e) => {
            this.nota = e;
        })
    }

    // Função para instanciar um novo objeto nota
    initializeNewNota(): NotaFiscal {
        return {
            numeroNota: 0,
            dataEmissao: new Date(),
            cliente: {} as Cliente,
            itens: []
        } as NotaFiscal;
    }

    // Busca Clientes e Itens para auxliar os SelectBox
    loadAuxiliaryData() {
        this.clienteService.getClientes().subscribe(data => this.clientes = data);
        this.itemService.getItens().subscribe(data => this.itensDisponiveis = data);
    }

    // Abre popup para novo registro
    openRegisterPopup() {
        this.popupVisible = true;
        this.isEdit = false;
        this.newNota =  this.initializeNewNota();
    }

    // Fecha o popup
    closePopup() {
        this.popupVisible = false;
    }

    // Salva ou atualiza o objeto item dependendo do estado do popup
    saveOrUpdateNota() {
        // Validação básica do cliente (o ID deve ser selecionado)
        if (!this.newNota.cliente?.id) {
            notify("Selecione um cliente para a nota fiscal.", 'warning', 3000);
            return;
        }

        if (this.isEdit) {
            this.service.updateNotaFiscal(this.newNota).subscribe({
                next: () => {
                    this.popupVisible = false;
                    this.loadNotas();
                    notify(`Nota Fiscal ${this.newNota.numeroNota} atualizada com sucesso.`, 'success', 3000);
                },
                error: (e) => {
                    notify(`Erro ao atualizar Nota Fiscal: ${e.message}.`, 'error', 5000);
                }
            })
        } else {
            this.service.saveNotaFiscal(this.newNota).subscribe({
                next: () => {
                    this.popupVisible = false;
                    this.loadNotas();
                    notify(`Nota Fiscal ${this.newNota.numeroNota} salva com sucesso.`, 'success', 3000);
                },
                error: (e) => {
                    notify(`Erro ao salvar Nota Fiscal: ${e.message}.`, 'error', 5000);
                }
            })
        }
    }

    // handleGridAction(event: GridAction) {
    //     if (event.type === 'edit') {
    //         this.iniciarEdicao(event.data);
    //     } else if (event.type === 'delete') {
    //         this.confirmarExclusao(event.data);
    //     }
    // }

    // iniciarEdicao(nota: NotaFiscal) {
    //     this.popupVisible = true;
    //     this.isEdit = true;
    //     // Clonamos o objeto para edição e garantimos que os itens também são clonados
    //     this.newNota = { ...nota, itens: [...nota.itens] };
    // }
    //
    // confirmarExclusao(nota: NotaFiscal) {
    //     const message = `Deseja realmente excluir a Nota Fiscal Nº <b>${nota.numeroNota}</b>?`;
    //     const title = "Confirmação de Exclusão";
    //
    //     confirm(message, title).then((dialogResult) => {
    //         if (dialogResult) {
    //             console.log("Excluir nota")
    //         }
    //     });
    // }

    // Calcula o valor total da nota fiscal
    calculateNotaTotal(nota: NotaFiscal): number {
        if (!nota.itens || !Array.isArray(nota.itens) || nota.itens.length === 0) {
            return 0;
        }
        return nota.itens.reduce((sum, item) => sum + (+item.valorTotal || 0), 0);
    }

    // Define o cliente selecionado no objeto nota
    onClienteChanged(e: any) {
        const selectedClient = this.clientes.find(c => c.id === e.value);
        if (selectedClient) {
            this.newNota.cliente = selectedClient;
        }
    }

    // Adiciona item selecionado na grid e gera o sequencial
    onSelectItem(e: any) {
        const idItem = e.value;
        if (!idItem) return;

        const item = this.itensDisponiveis.find(i => i.id === idItem);
        if (!item) return;

        const jaExiste = this.newNota.itens.some(i => i.itemNota.id === idItem);

        if (jaExiste) {
            notify("Este item já foi adicionado!", "warning", 2000);
            return;
        }

        const sequencial = this.newNota.itens.length + 1;

        const novoItem: ItemNota = {
            id: 0,
            sequencial,
            itemNota: item,
            quantidade: 1,
            valorTotal: item.valorUnitario
        };

        this.newNota.itens.push(novoItem);
        this.atualizarTotalNota();

        e.component.reset();
    }

    // Atualiza o valor total do item se houver mudança na quantidade
    onCellValueChanged(e: any) {
        if (e.data && e.column.dataField === "quantidade") {
            e.data.valorTotal = e.data.valorUnitario * e.data.quantidade;
            this.atualizarTotalNota();
        }
    }

    // Atualiza o valor total da nota
    atualizarTotalNota() {
        this.totalNota = this.newNota.itens.reduce((sum, item) => sum + item.valorTotal, 0);
    }
}

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
        { caption: 'Valor total', dataType: 'number', format: 'BRL', alignment: 'right', calculateCellValue: (data: any) => this.calculateNotaTotal(data), hidingPriority: 4 },
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

    // Payload para registro da nota
    private buildPayload(): any {
        return {
            numeroNota: this.newNota.numeroNota,
            dataEmissao: this.newNota.dataEmissao,
            cliente: {
                id: this.newNota.cliente.id
            },
            itens: this.newNota.itens.map(i => ({
                sequencial: i.sequencial,
                quantidade: i.quantidade,
                itemNota: {
                    id: i.itemNota.id
                }
            }))
        };
    }


    // Salva ou atualiza o objeto item dependendo do estado do popup
    saveOrUpdateNota() {
        if (!this.newNota.cliente?.id) {
            notify("Selecione um cliente para a nota fiscal.", 'warning', 3000);
            return;
        }

        const payload = this.buildPayload(); // <<-- AQUI

        if (this.isEdit) {
            if (!this.newNota.id) {
                notify("Erro: Não há ID da nota para atualizar.", "error", 3000);
                return;
            }

            this.service.updateNotaFiscal(this.newNota.id, payload).subscribe({
                next: () => {
                    this.popupVisible = false;
                    this.loadNotas();
                    notify(`Nota Fiscal ${this.newNota.numeroNota} atualizada com sucesso.`, 'success', 3000);
                },
                error: (e) => {
                    notify(`Erro ao atualizar Nota Fiscal: ${e.message}.`, 'error', 5000);
                }
            });
        } else {
            this.service.saveNotaFiscal(payload).subscribe({
                next: () => {
                    this.popupVisible = false;
                    this.loadNotas();
                    notify(`Nota Fiscal ${this.newNota.numeroNota} salva com sucesso.`, 'success', 3000);
                },
                error: (e) => {
                    notify(`Erro ao salvar Nota Fiscal: ${e.message}.`, 'error', 5000);
                }
            });
        }
    }

    // Identifica qual ação deve ser disparada
    handleGridAction(event: GridAction) {
        if (event.type === 'edit') {
            this.startEditing(event.data);
        } else if (event.type === 'delete') {
            this.confirmDeletion(event.data);
        }
    }

    // Abre popup no modo edição e carrega os dados
    startEditing(nota: NotaFiscal) {
        this.popupVisible = true;
        this.isEdit = true;

        // Clonamos o objeto nota
        this.newNota = {
            ...nota,
            itens: [...nota.itens] };

        // Recalcular total ao abrir o popup
        this.updateTotalNota();
    }

    // Confirma a exclusão do objeto nota
    confirmDeletion(nota: NotaFiscal) {
        const message = `Deseja realmente excluir a Nota Fiscal Nº <b>${nota.numeroNota}</b>?`;
        const title = "Confirmação de Exclusão";

        confirm(message, title).then((dialogResult) => {
            if (dialogResult) {
                this.deleteNota(nota);
            }
        });
    }

    // Exclui o objeto item
    deleteNota(nota: NotaFiscal) {
        console.log("Excluir")
        if (!nota.id) {
            notify("Erro: Não há ID da nota para excluir.", "error", 3000);
            return;
        }

        this.service.deleteNotaFiscal(nota.id).subscribe({
            next: () => {
                this.loadNotas();
                notify(`Item ${nota.numeroNota} excluído com sucesso.`, 'success', 3000);
            },
            error: (e) => {
                notify(`Erro ao excluir item: ${e.message}`, 'error', 5000);
            }
        });
    }

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
        this.updateTotalNota();

        e.component.reset();
    }

    // Atualiza o valor total do item se houver mudança na quantidade
    onCellValueChanged(e: any) {
        const item = e.data; // linha atualizada

        if (!item) return;

        // Recalcular total corretamente
        item.valorTotal = item.itemNota.valorUnitario * item.quantidade;

        // Atualizar total geral da nota
        this.updateTotalNota();
    }

    // Atualiza o valor total da nota
    updateTotalNota() {
        this.totalNota = this.newNota.itens.reduce((sum, item) => sum + item.valorTotal, 0);
    }
}

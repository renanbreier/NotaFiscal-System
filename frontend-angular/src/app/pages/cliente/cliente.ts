import { Component } from '@angular/core';
import {Cliente} from "../../models/cliente";
import {ClienteService} from "../../shared/services/cliente.service";
import {GridAction, ReusableDatagridComponent} from "../../shared/components/reusable-datagrid/reusable-datagrid";
import {AddButtonComponent} from "../../shared/components/add-button/add-button";
import {PopupFormComponent} from "../../shared/components/popup-form/popup-form";
import {DxTextBoxComponent} from "devextreme-angular";

@Component({
  selector: 'app-cliente',
    imports: [
        ReusableDatagridComponent,
        AddButtonComponent,
        PopupFormComponent,
        DxTextBoxComponent,
    ],
  templateUrl: './cliente.html',
  styleUrl: './cliente.scss',
})
export class ClienteComponent {

    cliente: Cliente[] = [];

    clienteColumns: any[] = [
        { dataField: 'codigo', caption: 'Código', width: 90, hidingPriority: 2 },
        { dataField: 'nome', caption: 'Nome', hidingPriority: 8 },
    ]

    novoCliente: Cliente = new Cliente();

    // Controla visibilidade do popup
    popupVisible: boolean = false;

    // Estado do popup cadastro/edição
    isEdit: boolean = false;

    constructor(private service: ClienteService) { }

    ngOnInit() {
        this.loadClientes()
    }

    loadClientes() {
        this.service.getClientes().subscribe((e) => {
            this.cliente = e;
        });
    }

    openCadastroPopup() {
        this.popupVisible = true;
        this.isEdit = false;
        this.novoCliente = new Cliente();
    }

    closeCadastroPopup() {
        this.popupVisible = false;
    }

    saveCadastroPopup() {
        this.service.saveCliente(this.novoCliente).subscribe({
            next: () => {
                this.popupVisible = false;
                this.loadClientes()
            },
            error: (e) => {
                console.error("Erro ao salvar cliente: ", e);
            }
        })
    }

    handleGridAction(event: GridAction) {
        if (event.type === 'edit') {
            this.iniciarEdicao(event.data);
        } else if (event.type === 'delete') {
            this.excluirCliente(event.data);
        }
    }

    excluirCliente(cliente: Cliente) {
        const confirmar = confirm(`Deseja realmente excluir o cliente: ${cliente.nome}?`);

        if (confirmar) {
            this.service.deleteCliente(cliente.id).subscribe({
                next: () => {
                    this.loadClientes();
                },
                error: (e) => {
                    console.error("Erro ao excluir cliente: ", e);
                }
            });
        }
    }

    iniciarEdicao(cliente: Cliente) {
        this.popupVisible = true;
        this.isEdit = true;
        this.novoCliente = {...cliente};
    }

    saveOrUpdateCliente() {
        if (this.isEdit) {
            this.service.updateCliente(this.novoCliente).subscribe({
                next: () => {
                    this.popupVisible = false;
                    this.loadClientes();
                },
                error: (e) => {
                    console.error("Erro ao atualizar cliente: ", e);
                }
            })
        } else {
            this.service.saveCliente(this.novoCliente).subscribe({
                next: () => {
                    this.popupVisible = false;
                    this.loadClientes()
                },
                error: (e) => {
                    console.error("Erro ao salvar cliente: ", e);
                }
            })
        }
    }
}

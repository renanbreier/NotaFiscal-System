import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DxButtonComponent, DxPopupComponent, DxTemplateDirective} from "devextreme-angular";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-popup-form',
    imports: [
        DxPopupComponent,
        DxButtonComponent,
        DxTemplateDirective,
        NgIf
    ],
  templateUrl: './popup-form.html',
  styleUrl: './popup-form.scss',
})
export class PopupFormComponent implements OnInit {

    // Atributos popup
    @Input() popupVisible: boolean = false;
    @Input() popupTitle: string = "Formulário";
    @Input() popupWidth: number = 600;

    // Atributos save button
    @Input() showSaveButton: boolean = true;
    @Input() saveButtonText: string = "Salvar";
    @Input() saveButtonType: string = "success";
    @Input() saveButtonIcon: string = "save";
    @Input() saveButtonStyle: string = "margin-right: 10px;";

    // Atributos close button
    @Input() showCloseButton: boolean = true;
    @Input() closeButtonText: string = "Cancelar";
    @Input() closeButtonType: string = "danger";
    @Input() closeButtonIcon: string = "close";
    @Input() closeButtonStyle: string = "margin-right: 10px;";

    // Evento quando o popup deve ser fechado
    @Output() closed = new EventEmitter();

    // Evento quando clicar no botao Salvar
    @Output() saved = new EventEmitter();

    ngOnInit(): void { }

    // Metodo quando clicar em Salvar
    onSave() {
        this.saved.emit();
    }

    // Metodo quando clicar em Cancelar
    onClose() {
        this.closed.emit();
    }
}

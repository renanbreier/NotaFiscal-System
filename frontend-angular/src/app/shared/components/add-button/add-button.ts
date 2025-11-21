import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DxButtonComponent} from "devextreme-angular";

@Component({
  selector: 'app-add-button',
    imports: [
        DxButtonComponent
    ],
  templateUrl: './add-button.html',
  styleUrl: './add-button.scss',
})
export class AddButtonComponent {

    // Propriedades do botão
    @Input() buttonIcon: string = "plus";
    @Input() buttonText: string = "Novo";
    @Input() buttonType: string = "normal";

    // Emite evento ao clicar
    @Output() buttonClicked = new EventEmitter();

    // Metodo quando clicar no botão
    onButtonClick() {
        this.buttonClicked.emit();
    }
}

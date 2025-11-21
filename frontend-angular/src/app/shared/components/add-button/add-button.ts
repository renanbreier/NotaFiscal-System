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

    // Icone do button
    @Input() buttonIcon: string = "plus";

    // Texto do button
    @Input() buttonText: string = "Novo";

    // Tipo do button
    @Input() buttonType: string = "normal";

    // Emitir evento ao clicar
    @Output() buttonClicked = new EventEmitter();

    // Metodo quando clicar no button
    onButtonClick() {
        this.buttonClicked.emit();
    }
}

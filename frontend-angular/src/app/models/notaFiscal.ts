import {Cliente} from "./cliente";
import {ItemNota} from "./itemNota";

export class NotaFiscal {

    constructor() { }

    id!: number;
    numeroNota!: number;
    dataEmissao!: Date;
    cliente!: Cliente;
    itens!: ItemNota;
}
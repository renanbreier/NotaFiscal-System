import {NotaFiscal} from "./notaFiscal";
import {Item} from "./item";

export class ItemNota {

    constructor() { }

    id!: number;
    sequencial!: number;
    itemNota!: Item;
    quantidade!: number;
    valorTotal!: number;
}
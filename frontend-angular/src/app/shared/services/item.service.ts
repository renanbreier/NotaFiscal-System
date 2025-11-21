import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Item} from "../../models/item";

@Injectable()
export class ItemService {

    dataSource: string = 'http://localhost:8080/api/item';

    constructor(private http: HttpClient) { }

    getItens(): Observable<Item[]> {
        return this.http.get<Item[]>(this.dataSource)
    }

    saveItem(item: Item): Observable<Item> {
        return this.http.post<Item>(this.dataSource, item)
    }

    deleteItem(id: number): Observable<Item> {
        return this.http.delete<Item>(this.dataSource + '/' + id)
    }

    updateItem(item: Item): Observable<Item> {
        return this.http.put<Item>(this.dataSource + '/' + item.id, item)
    }
}

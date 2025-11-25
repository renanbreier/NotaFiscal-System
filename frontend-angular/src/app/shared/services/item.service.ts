import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../../models/item';
import { environment } from '../../../environments/environments';

@Injectable({
    providedIn: 'root'
})
export class ItemService {

    private readonly baseUrl: string = `${environment.apiUrl}/item`;

    constructor(private http: HttpClient) {}

    getItens(): Observable<Item[]> {
        return this.http.get<Item[]>(this.baseUrl);
    }

    saveItem(item: Item): Observable<Item> {
        return this.http.post<Item>(this.baseUrl, item);
    }

    deleteItem(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    updateItem(item: Item): Observable<Item> {
        return this.http.put<Item>(`${this.baseUrl}/${item.id}`, item);
    }
}

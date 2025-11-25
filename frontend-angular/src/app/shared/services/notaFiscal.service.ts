import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { NotaFiscal } from "../../models/notaFiscal";
import { environment } from "../../../environments/environments";

@Injectable({
    providedIn: 'root'
})
export class NotaFiscalService {

    private readonly baseUrl: string = `${environment.apiUrl}/nota`;

    constructor(private http: HttpClient) {}

    getNotasFiscais(): Observable<NotaFiscal[]> {
        return this.http.get<NotaFiscal[]>(this.baseUrl);
    }

    saveNotaFiscal(notaFiscal: NotaFiscal): Observable<NotaFiscal> {
        return this.http.post<NotaFiscal>(this.baseUrl, notaFiscal);
    }

    deleteNotaFiscal(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    updateNotaFiscal(id: number, notaFiscal: NotaFiscal): Observable<NotaFiscal> {
        return this.http.put<NotaFiscal>(`${this.baseUrl}/${id}`, notaFiscal);
    }
}

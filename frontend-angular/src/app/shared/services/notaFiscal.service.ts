import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NotaFiscal} from "../../models/notaFiscal";

@Injectable()
export class NotaFiscalService {

    dataSource: string = 'http://localhost:8080/api/nota'

    constructor(private http: HttpClient) { }

    getNotasFiscais(): Observable<NotaFiscal[]> {
        return this.http.get<NotaFiscal[]>(this.dataSource)
    }

    saveNotaFiscal(notaFiscal: NotaFiscal): Observable<NotaFiscal> {
        return this.http.post<NotaFiscal>(this.dataSource, notaFiscal)
    }

    deleteNotaFiscal(id: number): Observable<NotaFiscal> {
        return this.http.delete<NotaFiscal>(this.dataSource + '/' + id)
    }

    updateNotaFiscal(notaFiscal: NotaFiscal): Observable<NotaFiscal> {
        return this.http.put<NotaFiscal>(this.dataSource + '/' + notaFiscal.id, notaFiscal)
    }
}
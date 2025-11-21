import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Cliente} from "../../models/cliente";

@Injectable()
export class ClienteService {

    dataSource: string = 'http://localhost:8080/api/cliente'

    constructor(private http: HttpClient) { }

    getClientes(): Observable<Cliente[]> {
        return this.http.get<Cliente[]>(this.dataSource)
    }

    saveCliente(cliente: Cliente): Observable<Cliente> {
        return this.http.post<Cliente>(this.dataSource, cliente)
    }

    deleteCliente(id: number): Observable<any> {
        return this.http.delete<Cliente>(this.dataSource + '/' + id)
    }

    updateCliente(cliente: Cliente): Observable<Cliente> {
        return this.http.put<Cliente>(this.dataSource + '/' + cliente.id, cliente)
    }
}
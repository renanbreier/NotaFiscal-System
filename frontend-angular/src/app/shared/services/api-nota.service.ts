import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Cliente} from "../../models/cliente";

@Injectable()
export class ApiNotaService {

    dataSource: string = 'http://localhost:8080/api'

    constructor(private http: HttpClient) { }

    getClientes(): Observable<Cliente[]> {
        return this.http.get<Cliente[]>(this.dataSource + "/cliente")
    }

    saveCliente(cliente: Cliente): Observable<Cliente> {
        return this.http.post<Cliente>(this.dataSource + "/cliente", cliente)
    }

    deleteCliente(id: number): Observable<any> {
        return this.http.delete<Cliente>(this.dataSource + "/cliente/" + id)
    }

    updateCliente(cliente: Cliente): Observable<Cliente> {
        return this.http.put<Cliente>(this.dataSource + "/cliente/" + cliente.id, cliente)
    }
}
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
}
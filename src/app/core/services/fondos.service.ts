import { Injectable } from "@angular/core";
import { Fondo } from "../models/fondo.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class FondosService {
    private apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getFondos(): Observable<Fondo[]> {
        return this.http.get<Fondo[]>(this.apiUrl);
    }
}

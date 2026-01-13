import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class InventarioService {
    private baseUrl = 'https://backend-minimarket-3swy.onrender.com/inventario';

    constructor(
        private httpClient: HttpClient
    ) { }

    public registrarEntrada(formData: any): Observable<any> {
        return this.httpClient.post(`${this.baseUrl}/entrada`, formData);
    }

    public registrarSalida(formData: any): Observable<any> {
        return this.httpClient.post(`${this.baseUrl}/salida`, formData);
    }

    public getAllMovimientos(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}/movimientos/getall`);
    }

    public getMovimientosByProducto(idProducto: string): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}/movimientos/producto/${idProducto}`);
    }

    public getEntradas(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}/movimientos/entradas`);
    }

    public getSalidas(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}/movimientos/salidas`);
    }
}

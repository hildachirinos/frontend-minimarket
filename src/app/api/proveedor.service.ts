import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ProveedorService {
    private baseUrl = 'https://backend-minimarket-3swy.onrender.com/proveedor';

    constructor(
        private httpClient: HttpClient
    ) { }

    public insert(formData: any): Observable<any> {
        return this.httpClient.post(`${this.baseUrl}/insert`, formData);
    }

    public update(formData: any): Observable<any> {
        return this.httpClient.put(`${this.baseUrl}/update`, formData);
    }

    public delete(id: string): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}/delete/${id}`);
    }

    public getAll(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}/getall`);
    }

    public getAllActivos(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}/getallactivos`);
    }

    public getById(id: string): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}/getbyid/${id}`);
    }
}

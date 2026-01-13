import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class PersonService {
	constructor(
		private httpClient: HttpClient
	) { }

	public insert(formData: any): Observable<any> {
		return this.httpClient.post('https://backend-minimarket-3swy.onrender.com/person/insert', formData);
	}

	public getAll(): Observable<any> {
		return this.httpClient.get('https://backend-minimarket-3swy.onrender.com/person/getall');
	}
}
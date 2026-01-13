import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class UserService {
	constructor(
		private httpClient: HttpClient
	) { }

	public login(formData: any): Observable<any> {
		return this.httpClient.post('https://backend-minimarket-3swy.onrender.com/auth/login', formData);
	}
}
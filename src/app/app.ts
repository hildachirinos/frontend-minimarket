import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './api/auth.service';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, RouterLink, CommonModule],
	templateUrl: './app.html',
	styleUrl: './app.css'
})

export class App {
	constructor(
		private router: Router,
		public authService: AuthService
	) { }

	isLoggedIn(): boolean {
		return localStorage.getItem('jwtValue') !== null;
	}

	logout(): void {
		localStorage.clear();
		this.router.navigate(['/user/login']);
	}

	getUserNombre(): string {
		return localStorage.getItem('userNombre') || 'Usuario';
	}

	getUserRole(): string {
		return localStorage.getItem('userRol') || '';
	}
}
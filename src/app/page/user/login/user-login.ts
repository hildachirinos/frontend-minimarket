import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../api/user.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-user-login',
	imports: [
		ReactiveFormsModule
	],
	templateUrl: './user-login.html',
	styleUrl: './user-login.css'
})

export class UserLogin {
	formUser: FormGroup;

	get userNameFb() { return this.formUser.controls['userName']; }
	get passwordFb() { return this.formUser.controls['password']; }

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private userService: UserService
	) {
		this.formUser = this.formBuilder.group({
			'userName': [null, []],
			'password': [null, []]
		});
	}

	sendFormLogin(): void {
		let formData = new FormData();

		formData.append('userName', this.userNameFb.value);
		formData.append('password', this.passwordFb.value);

		this.userService.login(formData).subscribe({
			next: (response: any) => {
				if (response.token != undefined) {
					// Guardar token y datos del usuario
					localStorage.setItem('jwtValue', response.token);
					localStorage.setItem('userName', response.userName);
					localStorage.setItem('userNombre', response.nombre);
					localStorage.setItem('userRol', response.rol);

					this.router.navigate(['/dashboard']);
				}
			},
			error: (error: any) => {
				console.log(error);
				alert('Usuario o contraseña incorrectos');
			}
		});
	}
}
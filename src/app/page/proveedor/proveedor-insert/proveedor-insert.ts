import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProveedorService } from '../../../api/proveedor.service';

@Component({
    selector: 'app-proveedor-insert',
    imports: [
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './proveedor-insert.html',
    styleUrl: './proveedor-insert.css'
})

export class ProveedorInsert {
    formProveedor: FormGroup;

    get rucFb() { return this.formProveedor.controls['ruc']; }
    get razonSocialFb() { return this.formProveedor.controls['razonSocial']; }
    get direccionFb() { return this.formProveedor.controls['direccion']; }
    get telefonoFb() { return this.formProveedor.controls['telefono']; }
    get emailFb() { return this.formProveedor.controls['email']; }
    get contactoFb() { return this.formProveedor.controls['contacto']; }

    constructor(
        private formBuilder: FormBuilder,
        private proveedorService: ProveedorService,
        private router: Router
    ) {
        this.formProveedor = this.formBuilder.group({
            'ruc': [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
            'razonSocial': [null, [Validators.required, Validators.maxLength(150)]],
            'direccion': [null, [Validators.maxLength(200)]],
            'telefono': [null, [Validators.maxLength(20)]],
            'email': [null, [Validators.email, Validators.maxLength(100)]],
            'contacto': [null, [Validators.maxLength(100)]]
        });
    }

    public insert(): void {
        if (this.formProveedor.invalid) {
            alert('Complete los campos requeridos correctamente');
            return;
        }

        let formData = new FormData();

        formData.append('dto.proveedor.ruc', this.rucFb.value);
        formData.append('dto.proveedor.razonSocial', this.razonSocialFb.value);
        formData.append('dto.proveedor.direccion', this.direccionFb.value || '');
        formData.append('dto.proveedor.telefono', this.telefonoFb.value || '');
        formData.append('dto.proveedor.email', this.emailFb.value || '');
        formData.append('dto.proveedor.contacto', this.contactoFb.value || '');

        this.proveedorService.insert(formData).subscribe({
            next: (response: any) => {
                if (response.type === 'success') {
                    alert(response.listMessage[0]);
                    this.router.navigate(['/proveedor/list']);
                } else {
                    alert(response.listMessage[0]);
                }
            },
            error: (error: any) => {
                console.log(error);
                alert('Error al registrar el proveedor');
            }
        });
    }

    public goBack(): void {
        this.router.navigate(['/proveedor/list']);
    }
}

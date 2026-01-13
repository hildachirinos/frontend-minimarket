import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../../api/categoria.service';

@Component({
    selector: 'app-categoria-insert',
    imports: [
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './categoria-insert.html',
    styleUrl: './categoria-insert.css'
})

export class CategoriaInsert {
    formCategoria: FormGroup;

    get nombreFb() { return this.formCategoria.controls['nombre']; }
    get descripcionFb() { return this.formCategoria.controls['descripcion']; }

    constructor(
        private formBuilder: FormBuilder,
        private categoriaService: CategoriaService,
        private router: Router
    ) {
        this.formCategoria = this.formBuilder.group({
            'nombre': [null, [Validators.required, Validators.maxLength(100)]],
            'descripcion': [null, [Validators.maxLength(255)]]
        });
    }

    public insert(): void {
        if (this.formCategoria.invalid) {
            alert('Complete los campos requeridos');
            return;
        }

        let formData = new FormData();

        formData.append('dto.categoria.nombre', this.nombreFb.value);
        formData.append('dto.categoria.descripcion', this.descripcionFb.value || '');

        this.categoriaService.insert(formData).subscribe({
            next: (response: any) => {
                if (response.type === 'success') {
                    alert(response.listMessage[0]);
                    this.router.navigate(['/categoria/list']);
                } else {
                    alert(response.listMessage[0]);
                }
            },
            error: (error: any) => {
                console.log(error);
                alert('Error al registrar la categoría');
            }
        });
    }

    public goBack(): void {
        this.router.navigate(['/categoria/list']);
    }
}

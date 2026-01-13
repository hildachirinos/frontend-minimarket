import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

export class CategoriaInsert implements OnInit {
    formCategoria: FormGroup;
    categoriaId: string | null = null;
    isEditMode: boolean = false;

    get nombreFb() { return this.formCategoria.controls['nombre']; }
    get descripcionFb() { return this.formCategoria.controls['descripcion']; }

    constructor(
        private formBuilder: FormBuilder,
        private categoriaService: CategoriaService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.formCategoria = this.formBuilder.group({
            'nombre': [null, [Validators.required, Validators.maxLength(100)]],
            'descripcion': [null, [Validators.maxLength(255)]]
        });
    }

    ngOnInit(): void {
        this.categoriaId = this.activatedRoute.snapshot.paramMap.get('id');
        if (this.categoriaId) {
            this.isEditMode = true;
            this.loadCategoria();
        }
    }

    loadCategoria(): void {
        this.categoriaService.getById(this.categoriaId!).subscribe({
            next: (response: any) => {
                this.formCategoria.patchValue({
                    nombre: response.nombre,
                    descripcion: response.descripcion
                });
            },
            error: (error: any) => {
                console.log(error);
                alert('Error al cargar los datos de la categoría');
            }
        });
    }

    public save(): void {
        if (this.formCategoria.invalid) {
            alert('Complete los campos requeridos');
            return;
        }

        let formData = new FormData();

        if (this.isEditMode) {
            formData.append('dto.categoria.id', this.categoriaId!);
        }

        formData.append('dto.categoria.nombre', this.nombreFb.value);
        formData.append('dto.categoria.descripcion', this.descripcionFb.value || '');

        const request = this.isEditMode
            ? this.categoriaService.update(formData)
            : this.categoriaService.insert(formData);

        request.subscribe({
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
                alert(`Error al ${this.isEditMode ? 'actualizar' : 'registrar'} la categoría`);
            }
        });
    }

    public goBack(): void {
        this.router.navigate(['/categoria/list']);
    }
}

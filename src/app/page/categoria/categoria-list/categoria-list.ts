import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CategoriaService } from '../../../api/categoria.service';

@Component({
    selector: 'app-categoria-list',
    imports: [
        CommonModule
    ],
    templateUrl: './categoria-list.html',
    styleUrl: './categoria-list.css'
})

export class CategoriaList implements OnInit {
    listCategoria: any[] = [];

    constructor(
        private categoriaService: CategoriaService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadCategorias();
    }

    loadCategorias(): void {
        this.categoriaService.getAll().subscribe({
            next: (response: any) => {
                this.listCategoria = response;
            },
            error: (error: any) => {
                console.log(error);
            }
        });
    }

    goToInsert(): void {
        this.router.navigate(['/categoria/insert']);
    }

    editCategoria(id: string): void {
        this.router.navigate(['/categoria/edit', id]);
    }

    deleteCategoria(id: string): void {
        if (confirm('¿Está seguro de eliminar esta categoría?')) {
            this.categoriaService.delete(id).subscribe({
                next: (response: any) => {
                    if (response.type === 'success') {
                        alert(response.listMessage[0]);
                        this.loadCategorias();
                    } else {
                        alert(response.listMessage[0]);
                    }
                },
                error: (error: any) => {
                    console.log(error);
                }
            });
        }
    }
}

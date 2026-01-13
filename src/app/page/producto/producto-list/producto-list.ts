import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductoService } from '../../../api/producto.service';
import { AuthService } from '../../../api/auth.service';

@Component({
    selector: 'app-producto-list',
    imports: [
        CommonModule
    ],
    templateUrl: './producto-list.html',
    styleUrl: './producto-list.css'
})

export class ProductoList implements OnInit {
    listProducto: any[] = [];

    constructor(
        private productoService: ProductoService,
        private router: Router,
        public authService: AuthService
    ) { }

    ngOnInit(): void {
        this.loadProductos();
    }

    loadProductos(): void {
        this.productoService.getAll().subscribe({
            next: (response: any) => {
                this.listProducto = response;
            },
            error: (error: any) => {
                console.log(error);
            }
        });
    }

    goToInsert(): void {
        this.router.navigate(['/producto/insert']);
    }

    editProducto(id: string): void {
        this.router.navigate(['/producto/edit', id]);
    }

    deleteProducto(id: string): void {
        if (confirm('¿Está seguro de eliminar este producto?')) {
            this.productoService.delete(id).subscribe({
                next: (response: any) => {
                    if (response.type === 'success') {
                        alert(response.listMessage[0]);
                        this.loadProductos();
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

    registrarEntrada(id: string): void {
        this.router.navigate(['/inventario/entrada'], { queryParams: { producto: id } });
    }

    registrarSalida(id: string): void {
        this.router.navigate(['/inventario/salida'], { queryParams: { producto: id } });
    }
}

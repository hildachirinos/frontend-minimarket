import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ProductoService } from '../../api/producto.service';
import { CategoriaService } from '../../api/categoria.service';
import { ProveedorService } from '../../api/proveedor.service';
import { AuthService } from '../../api/auth.service';

@Component({
    selector: 'app-dashboard',
    imports: [
        CommonModule,
        RouterLink
    ],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.css'
})

export class Dashboard implements OnInit {
    totalProductos: number = 0;
    totalCategorias: number = 0;
    totalProveedores: number = 0;
    productosStockBajo: any[] = [];

    constructor(
        private productoService: ProductoService,
        private categoriaService: CategoriaService,
        private proveedorService: ProveedorService,
        private router: Router,
        public authService: AuthService
    ) { }

    ngOnInit(): void {
        this.loadData();
    }

    loadData(): void {
        if (this.authService.canViewProducts()) {
            this.productoService.getAllActivos().subscribe({
                next: (response: any) => {
                    this.totalProductos = response.length;
                }
            });
        }

        if (this.authService.canManageInventory()) {
            this.productoService.getStockBajo().subscribe({
                next: (response: any) => {
                    this.productosStockBajo = response;
                }
            });
        }

        if (this.authService.canManageCatalogs()) {
            this.categoriaService.getAllActivas().subscribe({
                next: (response: any) => {
                    this.totalCategorias = response.length;
                }
            });

            this.proveedorService.getAllActivos().subscribe({
                next: (response: any) => {
                    this.totalProveedores = response.length;
                }
            });
        }
    }

    goToProductos(): void {
        if (this.authService.canViewProducts()) {
            this.router.navigate(['/producto/list']);
        }
    }

    goToCategorias(): void {
        if (this.authService.canManageCatalogs()) {
            this.router.navigate(['/categoria/list']);
        }
    }

    goToProveedores(): void {
        if (this.authService.canManageCatalogs()) {
            this.router.navigate(['/proveedor/list']);
        }
    }

    goToMovimientos(): void {
        if (this.authService.canManageInventory()) {
            this.router.navigate(['/inventario/movimientos']);
        }
    }

    registrarEntrada(idProducto: string): void {
        if (this.authService.canManageInventory()) {
            this.router.navigate(['/inventario/entrada'], { queryParams: { producto: idProducto } });
        }
    }
}

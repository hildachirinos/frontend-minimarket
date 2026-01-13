import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProveedorService } from '../../../api/proveedor.service';

@Component({
    selector: 'app-proveedor-list',
    imports: [
        CommonModule
    ],
    templateUrl: './proveedor-list.html',
    styleUrl: './proveedor-list.css'
})

export class ProveedorList implements OnInit {
    listProveedor: any[] = [];

    constructor(
        private proveedorService: ProveedorService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadProveedores();
    }

    loadProveedores(): void {
        this.proveedorService.getAll().subscribe({
            next: (response: any) => {
                this.listProveedor = response;
            },
            error: (error: any) => {
                console.log(error);
            }
        });
    }

    goToInsert(): void {
        this.router.navigate(['/proveedor/insert']);
    }

    editProveedor(id: string): void {
        this.router.navigate(['/proveedor/edit', id]);
    }

    deleteProveedor(id: string): void {
        if (confirm('¿Está seguro de eliminar este proveedor?')) {
            this.proveedorService.delete(id).subscribe({
                next: (response: any) => {
                    if (response.type === 'success') {
                        alert(response.listMessage[0]);
                        this.loadProveedores();
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

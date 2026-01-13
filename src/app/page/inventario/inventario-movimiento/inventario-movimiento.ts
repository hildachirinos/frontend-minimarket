import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InventarioService } from '../../../api/inventario.service';
import { DateFormatPipe } from '../../../pipe/date-format-pipe';

@Component({
    selector: 'app-inventario-movimiento',
    imports: [
        CommonModule,
        DateFormatPipe
    ],
    templateUrl: './inventario-movimiento.html',
    styleUrl: './inventario-movimiento.css'
})

export class InventarioMovimiento implements OnInit {
    listMovimiento: any[] = [];
    filtroActual: string = 'todos';

    constructor(
        private inventarioService: InventarioService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadMovimientos();
    }

    loadMovimientos(): void {
        this.inventarioService.getAllMovimientos().subscribe({
            next: (response: any) => {
                this.listMovimiento = response;
            },
            error: (error: any) => {
                console.log(error);
            }
        });
    }

    filtrarTodos(): void {
        this.filtroActual = 'todos';
        this.loadMovimientos();
    }

    filtrarEntradas(): void {
        this.filtroActual = 'entradas';
        this.inventarioService.getEntradas().subscribe({
            next: (response: any) => {
                this.listMovimiento = response;
            },
            error: (error: any) => {
                console.log(error);
            }
        });
    }

    filtrarSalidas(): void {
        this.filtroActual = 'salidas';
        this.inventarioService.getSalidas().subscribe({
            next: (response: any) => {
                this.listMovimiento = response;
            },
            error: (error: any) => {
                console.log(error);
            }
        });
    }

    goToEntrada(): void {
        this.router.navigate(['/inventario/entrada']);
    }

    goToSalida(): void {
        this.router.navigate(['/inventario/salida']);
    }
}

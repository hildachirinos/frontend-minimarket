import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InventarioService } from '../../../api/inventario.service';
import { ProductoService } from '../../../api/producto.service';

@Component({
    selector: 'app-inventario-entrada',
    imports: [
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './inventario-entrada.html',
    styleUrl: './inventario-entrada.css'
})

export class InventarioEntrada implements OnInit {
    formMovimiento: FormGroup;
    listProducto: any[] = [];
    productoSeleccionado: any = null;

    get idProductoFb() { return this.formMovimiento.controls['idProducto']; }
    get cantidadFb() { return this.formMovimiento.controls['cantidad']; }
    get motivoFb() { return this.formMovimiento.controls['motivo']; }
    get observacionFb() { return this.formMovimiento.controls['observacion']; }
    get documentoReferenciaFb() { return this.formMovimiento.controls['documentoReferencia']; }

    constructor(
        private formBuilder: FormBuilder,
        private inventarioService: InventarioService,
        private productoService: ProductoService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.formMovimiento = this.formBuilder.group({
            'idProducto': [null, [Validators.required]],
            'cantidad': [1, [Validators.required, Validators.min(1)]],
            'motivo': ['COMPRA', [Validators.required]],
            'observacion': [null, []],
            'documentoReferencia': [null, []]
        });
    }

    ngOnInit(): void {
        this.loadProductos();

        // Pre-seleccionar producto si viene de la lista
        this.route.queryParams.subscribe(params => {
            if (params['producto']) {
                this.formMovimiento.patchValue({ idProducto: params['producto'] });
                this.onProductoChange();
            }
        });
    }

    loadProductos(): void {
        this.productoService.getAllActivos().subscribe({
            next: (response: any) => {
                this.listProducto = response;
            },
            error: (error: any) => {
                console.log(error);
            }
        });
    }

    onProductoChange(): void {
        const idProducto = this.idProductoFb.value;
        this.productoSeleccionado = this.listProducto.find(p => p.idProducto === idProducto) || null;
    }

    public registrar(): void {
        if (this.formMovimiento.invalid) {
            alert('Complete los campos requeridos correctamente');
            return;
        }

        let formData = new FormData();

        formData.append('dto.movimiento.idProducto', this.idProductoFb.value);
        formData.append('dto.movimiento.cantidad', this.cantidadFb.value);
        formData.append('dto.movimiento.motivo', this.motivoFb.value);
        formData.append('dto.movimiento.observacion', this.observacionFb.value || '');
        formData.append('dto.movimiento.documentoReferencia', this.documentoReferenciaFb.value || '');

        this.inventarioService.registrarEntrada(formData).subscribe({
            next: (response: any) => {
                if (response.type === 'success') {
                    alert(response.listMessage[0]);
                    this.router.navigate(['/inventario/movimientos']);
                } else {
                    alert(response.listMessage[0]);
                }
            },
            error: (error: any) => {
                console.log(error);
                alert('Error al registrar la entrada');
            }
        });
    }

    public goBack(): void {
        this.router.navigate(['/producto/list']);
    }
}

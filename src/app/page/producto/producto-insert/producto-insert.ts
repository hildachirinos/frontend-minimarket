import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../../api/producto.service';
import { CategoriaService } from '../../../api/categoria.service';
import { ProveedorService } from '../../../api/proveedor.service';

@Component({
    selector: 'app-producto-insert',
    imports: [
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './producto-insert.html',
    styleUrl: './producto-insert.css'
})

export class ProductoInsert implements OnInit {
    formProducto: FormGroup;
    listCategoria: any[] = [];
    listProveedor: any[] = [];
    productoId: string | null = null;
    isEditMode: boolean = false;

    get codigoFb() { return this.formProducto.controls['codigo']; }
    get nombreFb() { return this.formProducto.controls['nombre']; }
    get descripcionFb() { return this.formProducto.controls['descripcion']; }
    get idCategoriaFb() { return this.formProducto.controls['idCategoria']; }
    get idProveedorFb() { return this.formProducto.controls['idProveedor']; }
    get precioCompraFb() { return this.formProducto.controls['precioCompra']; }
    get precioVentaFb() { return this.formProducto.controls['precioVenta']; }
    get stockActualFb() { return this.formProducto.controls['stockActual']; }
    get stockMinimoFb() { return this.formProducto.controls['stockMinimo']; }
    get unidadMedidaFb() { return this.formProducto.controls['unidadMedida']; }

    constructor(
        private formBuilder: FormBuilder,
        private productoService: ProductoService,
        private categoriaService: CategoriaService,
        private proveedorService: ProveedorService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.formProducto = this.formBuilder.group({
            'codigo': [null, [Validators.required, Validators.maxLength(50)]],
            'nombre': [null, [Validators.required, Validators.maxLength(150)]],
            'descripcion': [null, [Validators.maxLength(300)]],
            'idCategoria': [null, [Validators.required]],
            'idProveedor': [null, []],
            'precioCompra': [0, [Validators.required, Validators.min(0)]],
            'precioVenta': [0, [Validators.required, Validators.min(0)]],
            'stockActual': [0, [Validators.required, Validators.min(0)]],
            'stockMinimo': [5, [Validators.required, Validators.min(0)]],
            'unidadMedida': ['UNIDAD', [Validators.required]]
        });
    }

    ngOnInit(): void {
        this.loadCategorias();
        this.loadProveedores();
        this.productoId = this.activatedRoute.snapshot.paramMap.get('id');
        if (this.productoId) {
            this.isEditMode = true;
            this.loadProducto();
        }
    }

    loadProducto(): void {
        this.productoService.getById(this.productoId!).subscribe({
            next: (response: any) => {
                this.formProducto.patchValue({
                    codigo: response.codigo,
                    nombre: response.nombre,
                    descripcion: response.descripcion,
                    idCategoria: response.idCategoria,
                    idProveedor: response.idProveedor,
                    precioCompra: response.precioCompra,
                    precioVenta: response.precioVenta,
                    stockActual: response.stockActual,
                    stockMinimo: response.stockMinimo,
                    unidadMedida: response.unidadMedida
                });
            },
            error: (error: any) => {
                console.log(error);
                alert('Error al cargar los datos del producto');
            }
        });
    }

    loadCategorias(): void {
        this.categoriaService.getAllActivas().subscribe({
            next: (response: any) => {
                this.listCategoria = response;
            },
            error: (error: any) => {
                console.log(error);
            }
        });
    }

    loadProveedores(): void {
        this.proveedorService.getAllActivos().subscribe({
            next: (response: any) => {
                this.listProveedor = response;
            },
            error: (error: any) => {
                console.log(error);
            }
        });
    }

    public save(): void {
        if (this.formProducto.invalid) {
            alert('Complete los campos requeridos correctamente');
            return;
        }

        let formData = new FormData();

        if (this.isEditMode) {
            formData.append('dto.producto.id', this.productoId!);
        }

        formData.append('dto.producto.codigo', this.codigoFb.value);
        formData.append('dto.producto.nombre', this.nombreFb.value);
        formData.append('dto.producto.descripcion', this.descripcionFb.value || '');
        formData.append('dto.producto.idCategoria', this.idCategoriaFb.value);
        formData.append('dto.producto.idProveedor', this.idProveedorFb.value || '');
        formData.append('dto.producto.precioCompra', this.precioCompraFb.value);
        formData.append('dto.producto.precioVenta', this.precioVentaFb.value);
        formData.append('dto.producto.stockActual', this.stockActualFb.value);
        formData.append('dto.producto.stockMinimo', this.stockMinimoFb.value);
        formData.append('dto.producto.unidadMedida', this.unidadMedidaFb.value);

        const request = this.isEditMode
            ? this.productoService.update(formData)
            : this.productoService.insert(formData);

        request.subscribe({
            next: (response: any) => {
                if (response.type === 'success') {
                    alert(response.listMessage[0]);
                    this.router.navigate(['/producto/list']);
                } else {
                    alert(response.listMessage[0]);
                }
            },
            error: (error: any) => {
                console.log(error);
                alert(`Error al ${this.isEditMode ? 'actualizar' : 'registrar'} el producto`);
            }
        });
    }

    public goBack(): void {
        this.router.navigate(['/producto/list']);
    }
}

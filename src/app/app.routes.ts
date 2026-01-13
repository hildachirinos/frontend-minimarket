import { Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';
import { roleGuard } from './guard/role.guard';

// Dashboard
import { Dashboard } from './page/dashboard/dashboard';

// Categorías
import { CategoriaList } from './page/categoria/categoria-list/categoria-list';
import { CategoriaInsert } from './page/categoria/categoria-insert/categoria-insert';

// Proveedores
import { ProveedorList } from './page/proveedor/proveedor-list/proveedor-list';
import { ProveedorInsert } from './page/proveedor/proveedor-insert/proveedor-insert';

// Productos
import { ProductoList } from './page/producto/producto-list/producto-list';
import { ProductoInsert } from './page/producto/producto-insert/producto-insert';

// Inventario
import { InventarioMovimiento } from './page/inventario/inventario-movimiento/inventario-movimiento';
import { InventarioEntrada } from './page/inventario/inventario-entrada/inventario-entrada';
import { InventarioSalida } from './page/inventario/inventario-salida/inventario-salida';

// Auth
import { UserLogin } from './page/user/login/user-login';

export const routes: Routes = [
	{ path: 'user/login', component: UserLogin },

	{
		path: '',
		canActivate: [authGuard],
		children: [
			{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
			{ path: 'dashboard', component: Dashboard },

			{
				path: 'categoria/list',
				component: CategoriaList,
				canActivate: [roleGuard(['ADMIN'])]
			},
			{
				path: 'categoria/insert',
				component: CategoriaInsert,
				canActivate: [roleGuard(['ADMIN'])]
			},

			{
				path: 'proveedor/list',
				component: ProveedorList,
				canActivate: [roleGuard(['ADMIN'])]
			},
			{
				path: 'proveedor/insert',
				component: ProveedorInsert,
				canActivate: [roleGuard(['ADMIN'])]
			},

			{
				path: 'producto/list',
				component: ProductoList,
				canActivate: [roleGuard(['ADMIN', 'ALMACEN', 'VENDEDOR'])]
			},
			{
				path: 'producto/insert',
				component: ProductoInsert,
				canActivate: [roleGuard(['ADMIN', 'ALMACEN'])]
			},

			{
				path: 'inventario/movimientos',
				component: InventarioMovimiento,
				canActivate: [roleGuard(['ADMIN', 'ALMACEN'])]
			},
			{
				path: 'inventario/entrada',
				component: InventarioEntrada,
				canActivate: [roleGuard(['ADMIN', 'ALMACEN'])]
			},
			{
				path: 'inventario/salida',
				component: InventarioSalida,
				canActivate: [roleGuard(['ADMIN', 'ALMACEN'])]
			}
		]
	},

	{ path: '**', redirectTo: 'user/login' }
];

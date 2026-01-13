import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor() { }

    getUserRole(): string | null {
        return localStorage.getItem('userRol');
    }

    hasRole(role: string): boolean {
        return this.getUserRole() === role;
    }

    hasAnyRole(roles: string[]): boolean {
        const userRole = this.getUserRole();
        return userRole !== null && roles.includes(userRole);
    }

    isAdmin(): boolean {
        return this.hasRole('ADMIN');
    }

    isVendedor(): boolean {
        return this.hasRole('VENDEDOR');
    }

    isAlmacen(): boolean {
        return this.hasRole('ALMACEN');
    }

    canManageProducts(): boolean {
        return this.hasAnyRole(['ADMIN', 'ALMACEN']);
    }

    canManageInventory(): boolean {
        return this.hasAnyRole(['ADMIN', 'ALMACEN']);
    }

    canManageCatalogs(): boolean {
        return this.isAdmin();
    }

    canSell(): boolean {
        return this.hasAnyRole(['ADMIN', 'VENDEDOR']);
    }

    canViewProducts(): boolean {
        return this.hasAnyRole(['ADMIN', 'ALMACEN', 'VENDEDOR']);
    }

    canViewCatalog(): boolean {
        return this.hasAnyRole(['ADMIN', 'VENDEDOR']);
    }
}

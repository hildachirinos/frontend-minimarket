import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../api/auth.service';

/**
 * Guard para verificar si el usuario tiene uno de los roles permitidos
 * Uso: canActivate: [roleGuard(['ADMIN', 'ALMACEN'])]
 */
export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
    return (route, state) => {
        const router = inject(Router);
        const authService = inject(AuthService);

        // Verificar si el usuario tiene alguno de los roles permitidos
        if (authService.hasAnyRole(allowedRoles)) {
            return true;
        } else {
            // Si no tiene el rol, redirigir al dashboard
            router.navigate(['/dashboard']);
            return false;
        }
    };
};

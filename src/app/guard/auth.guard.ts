import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const token = localStorage.getItem('jwtValue');

    if (token) {
        // Si hay token, permitimos el acceso
        return true;
    } else {
        // Si no hay token, redirigimos al login
        router.navigate(['/user/login']);
        return false;
    }
};

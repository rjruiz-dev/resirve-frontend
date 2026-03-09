/**
 * Admin Guard - ReSirve Frontend
 * 
 * Guard que protege las rutas administrativas.
 * Solo permite acceso a usuarios autenticados con rol de administrador.
 * 
 * NOTA: Este guard se activará en la Fase 3 cuando implementemos
 * el sistema de autenticación con Laravel Sanctum.
 */

import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { of } from 'rxjs';

/**
 * Guard funcional (Angular 19)
 * 
 * Por ahora retorna true para permitir acceso durante desarrollo.
 * En la Fase 3, aquí verificaremos si el usuario está autenticado
 * y tiene permisos de administrador.
 */
export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // ============================================
  // FASE 1 Y 2: PERMITIR ACCESO (DESARROLLO)
  // ============================================
  
  // Por ahora permitimos el acceso para poder desarrollar
  // las páginas del admin sin necesidad de autenticación
  return true;
  
  // ============================================
  // FASE 3: VERIFICAR AUTENTICACIÓN (PRODUCCIÓN)
  // ============================================
  
  // En la Fase 3, descomentar este código y comentar el return true de arriba:
  
  /*
  const authService = inject(AuthService);
  
  // Verificar si el usuario está autenticado
  if (!authService.isAuthenticated()) {
    // Redirigir al login guardando la URL original para volver después
    router.navigate(['/login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
  
  // Verificar si el usuario es administrador
  if (!authService.isAdmin()) {
    // Redirigir al home con mensaje de error
    router.navigate(['/'], {
      queryParams: { error: 'forbidden' }
    });
    return false;
  }
  
  // Usuario autenticado y es admin: permitir acceso
  return true;
  */
};
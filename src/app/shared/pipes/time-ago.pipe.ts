/**
 * Time Ago Pipe - ReSirve Frontend
 * 
 * Pipe personalizado para mostrar fechas en formato relativo.
 * Convierte timestamps a texto como "hace 2 días", "hace 1 hora", etc.
 * 
 * Uso: {{ product.created_at | timeAgo }}
 * Resultado: "hace 3 días"
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {
  /**
   * Transforma una fecha a formato relativo
   * 
   * @param value Fecha en formato string o Date
   * @returns String con el tiempo relativo
   */
  transform(value: string | Date | null | undefined): string {
    if (!value) return '';
    
    const date = typeof value === 'string' ? new Date(value) : value;
    const now = new Date();
    const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    // Menos de 1 minuto
    if (secondsAgo < 60) {
      return 'hace unos segundos';
    }
    
    // Menos de 1 hora
    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) {
      return minutesAgo === 1 
        ? 'hace 1 minuto' 
        : `hace ${minutesAgo} minutos`;
    }
    
    // Menos de 1 día
    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) {
      return hoursAgo === 1 
        ? 'hace 1 hora' 
        : `hace ${hoursAgo} horas`;
    }
    
    // Menos de 1 mes (30 días)
    const daysAgo = Math.floor(hoursAgo / 24);
    if (daysAgo < 30) {
      return daysAgo === 1 
        ? 'hace 1 día' 
        : `hace ${daysAgo} días`;
    }
    
    // Menos de 1 año (12 meses)
    const monthsAgo = Math.floor(daysAgo / 30);
    if (monthsAgo < 12) {
      return monthsAgo === 1 
        ? 'hace 1 mes' 
        : `hace ${monthsAgo} meses`;
    }
    
    // Más de 1 año
    const yearsAgo = Math.floor(monthsAgo / 12);
    return yearsAgo === 1 
      ? 'hace 1 año' 
      : `hace ${yearsAgo} años`;
  }
}
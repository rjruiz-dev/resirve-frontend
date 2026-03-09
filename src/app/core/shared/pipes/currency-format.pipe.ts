/**
 * Currency Format Pipe - ReSirve Frontend
 * 
 * Pipe personalizado para formatear precios en pesos argentinos.
 * 
 * Uso: {{ product.price | currencyFormat }}
 * Resultado: $85.000,00
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: true
})
export class CurrencyFormatPipe implements PipeTransform {
  
  transform(value: number | null | undefined, decimals: number = 2): string {
    if (value === null || value === undefined) {
      return '$0,00';
    }
    
    const formatted = value.toLocaleString('es-AR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
    
    return `$${formatted}`;
  }
}
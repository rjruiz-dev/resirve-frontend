# 0003. Lazy Loading obligatorio para todas las rutas

## Estado

Accepted

## Contexto

El proyecto usa Angular Router con rutas por feature (home, catalog, product-detail, about, contact). Las opciones de carga son:

1. **Carga eager**: todos los componentes se incluyen en el bundle principal.
2. **Lazy loading con `loadComponent`**: cada ruta carga su componente solo cuando se navega a ella.

Factores considerados:
- El objetivo es mantener el bundle inicial lo más pequeño posible.
- Cada feature page es independiente; el usuario raramente necesita todas en la primera carga.
- Angular 19 recomienda `loadComponent` para standalone components en vez de `loadChildren` con módulos.

## Decisión

**Todas las rutas de feature pages usarán lazy loading obligatorio mediante `loadComponent`.**

No hay excepciones para páginas principales. Solo los componentes compartidos críticos (navbar, footer, loading-spinner) se cargan eager dentro del layout.

## Consecuencias

### Positivas

- **Bundle inicial reducido**: solo se descarga el código necesario para renderizar la primera ruta.
- **Tiempo de carga inicial mejorado**: especialmente en conexiones lentas.
- **Escalabilidad**: agregar nuevas features no aumenta el bundle principal.

### Negativas

- **Navegación ligeramente más lenta**: la primera vez que se entra a una ruta lazy hay un delay mientras se descarga el chunk.
- **Complejidad en routing**: las rutas deben definirse como funciones `loadComponent` con `import()` dinámico.
- **Preloading**: si se desea optimizar, puede ser necesario agregar un preloading strategy en el futuro.

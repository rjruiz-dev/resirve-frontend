# 0007. Path Aliases y Barrel Exports para imports

## Estado

Accepted

## Contexto

A medida que el proyecto crece, las rutas de import relativas (`../../../core/services/product.service`) se vuelven ilegibles y frágiles al mover archivos. Existen dos mecanismos para mitigar esto:

1. **Path aliases de TypeScript**: mapear `@core/*`, `@shared/*`, etc. a rutas físicas.
2. **Barrel exports (`index.ts`)**: cada carpeta re-exporta sus miembros para importar desde el directorio en vez del archivo.

Factores considerados:
- Angular CLI soporta path aliases nativamente vía `tsconfig.json`.
- Barrel exports son una convención común en bibliotecas y proyectos enterprise.
- Sin estas herramientas, refactorizar la estructura de carpetas rompe decenas de imports.

## Decisión

**Usar path aliases para todas las áreas del proyecto y barrel exports para cada carpeta significativa.**

Configuración en `tsconfig.json`:
- `@core/*` → `src/app/core/*`
- `@shared/*` → `src/app/shared/*`
- `@features/*` → `src/app/features/*`
- `@layout/*` → `src/app/layout/*`
- `@environments/*` → `src/environments/*`

Cada carpeta (`core/services`, `shared/components`, etc.) tendrá un `index.ts` que re-exporta todo. Los imports siempre apuntan al barrel, nunca al archivo directo.

## Consecuencias

### Positivas

- **Imports limpios**: `import { Product } from '@core/models';` en vez de rutas relativas largas.
- **Refactor seguro**: mover un archivo dentro de `@core` no rompe imports externos.
- **Descubrimiento**: un nuevo desarrollador entiende la arquitectura leyendo los barrels.

### Negativas

- **Configuración inicial**: requiere modificar `tsconfig.json` y crear/mantener `index.ts` en cada carpeta.
- **Import circular**: si los barrels no se gestionan bien, pueden surgir dependencias circulares.
- **Tree-shaking**: barrels mal configurados pueden impedir que el bundler elimine código muerto.
- **Disciplina**: cada nuevo archivo debe agregarse al barrel; olvidarlo rompe la convención.

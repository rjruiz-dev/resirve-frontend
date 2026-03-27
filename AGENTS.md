# AGENTS.md — Estándares de Código: resirve-frontend

> **Documento vivo.** Refleja las convenciones YA establecidas en el código. Se actualiza a medida que el proyecto evoluciona. No inventes reglas que no existan en el codebase.

---

## Stack

- **Angular 19** con standalone components (sin NgModule)
- **TypeScript 5.7** con modo estricto completo
- **SCSS** como preprocesador de estilos
- **Bootstrap 5** importado de forma modular (no el bundle completo)
- **Bootstrap Icons** para iconografía
- **RxJS 7.8** para streams HTTP
- **Angular Signals** para estado reactivo local
- **Karma + Jasmine** para testing
- **Backend**: API Laravel (RESTful, JSON)

---

## General

- Indentación: **2 espacios** (no tabs)
- Encoding: **UTF-8**
- Comillas: **simples** en TypeScript (`.editorconfig` lo enforcea)
- Siempre agregar **newline al final** de cada archivo
- Sin trailing whitespace
- Todos los archivos TypeScript deben tener un **bloque de cabecera JSDoc** que explique su propósito:
  ```ts
  /**
   * Nombre del archivo - ReSirve Frontend
   *
   * Descripción breve del propósito del archivo.
   */
  ```
- Los comentarios inline, JSDoc y mensajes de error al usuario se escriben **en español**

---

## TypeScript

- **Modo estricto completo** habilitado en `tsconfig.json`:
  - `strict: true`
  - `noImplicitOverride: true`
  - `noPropertyAccessFromIndexSignature: true`
  - `noImplicitReturns: true`
  - `noFallthroughCasesInSwitch: true`
  - `strictTemplates: true` (Angular compiler)
  - `strictInjectionParameters: true`
  - `strictInputAccessModifiers: true`
- Target: **ES2022**, module: **ES2022**
- Usar **path aliases** definidos en `tsconfig.json`. Nunca usar rutas relativas largas:
  - `@core/*` → `src/app/core/*`
  - `@shared/*` → `src/app/shared/*`
  - `@features/*` → `src/app/features/*`
  - `@layout/*` → `src/app/layout/*`
  - `@environments/*` → `src/environments/*`
- Preferir `interface` sobre `type` para modelos de datos
- Usar `type` para union types y aliases literales:
  ```ts
  export type ProductStatus = 'disponible' | 'reservado' | 'vendido';
  ```
- Los modelos deben reflejar exactamente la estructura que devuelve la API Laravel
- Siempre tipar los genéricos en llamadas HTTP: `this.get<Product[]>(...)`

---

## Angular

### Componentes

- **Todos los componentes son standalone** (`standalone: true`). No usar NgModules.
- Selector con prefijo `app-`: `selector: 'app-nombre-componente'`
- Usar `inject()` en lugar de constructor injection:
  ```ts
  private http = inject(HttpClient);
  ```
- Template inline (`template: \`...\``) para componentes simples o layouts
- Template externo (`.html`) para componentes con lógica de template compleja (ej: navbar)
- Estilos: usar `styleUrl` (singular) para archivo externo, o `styles` (array) para inline
- Al usar estilos inline, importar variables SCSS con `@import 'variables';`
- Usar la sintaxis moderna de control flow en templates: `@if`, `@for`, `@switch` (no `*ngIf`, `*ngFor`)

### Signals (Estado reactivo)

- Usar **Angular Signals** para estado local en componentes y servicios
- Estado privado con `signal<T>()`, expuesto como readonly:
  ```ts
  private productsSignal = signal<Product[]>([]);
  readonly products = this.productsSignal.asReadonly();
  ```
- Valores derivados con `computed()`:
  ```ts
  readonly availableProducts = computed(() =>
    this.productsSignal().filter(p => p.status === 'disponible')
  );
  ```
- Mutaciones: `.set()` para reemplazar, `.update()` para transformar:
  ```ts
  this.loadingCountSignal.update(count => count + 1);
  ```

### Servicios

- `providedIn: 'root'` en todos los servicios (sin excepciones hasta ahora)
- Servicios HTTP extienden `ApiService` (servicio base que centraliza URL y métodos HTTP)
- Los métodos HTTP retornan `Observable<T>`, nunca `Promise`
- Usar `tap()` para side effects (actualizar signals) sin romper el stream

### Guards e Interceptors

- **Guards funcionales**: exportar `const miGuard: CanActivateFn = (route, state) => {...}`
- **Interceptors funcionales**: exportar `const miInterceptor: HttpInterceptorFn = (req, next) => {...}`
- Ambos usan `inject()` internamente para obtener dependencias

### Routing

- **Lazy loading obligatorio** para todas las rutas: usar `loadComponent()` con `import()`
- Siempre definir `title` en cada ruta para SEO
- Rutas en español (slugs): `/catalogo`, `/acerca-de`, `/contacto`, `/categoria/:slug`
- Parámetros de URL: usar `:slug` (no `:id`) para recursos identificados por slug
- Wildcard `**` redirige a `/404`

### Pipes y Directivas

- Todos standalone (`standalone: true`)
- Pipes: `PipeTransform`, nombre en camelCase en el decorador: `name: 'currencyFormat'`
- Directivas: selector con prefijo `app`: `selector: 'img[appImageFallback]'`

---

## SCSS / Estilos

### Organización de archivos de estilo

```
src/styles/
├── _variables.scss        # Variables del design system
├── _mixins.scss           # Mixins reutilizables
├── _bootstrap-overrides.scss  # Override de Bootstrap (definir variables ANTES del import)
└── styles.scss            # Punto de entrada global
```

- **Primero variables**, luego mixins, luego bootstrap-overrides, luego estilos globales
- Nunca usar `!important` excepto para sobrescribir Bootstrap cuando sea necesario

### Design System "Mercado de Pulgas Moderno"

Paleta de colores definida en `_variables.scss`. Usar siempre las variables, nunca valores hardcodeados:

- `$color-terracota: #E07856` — Color principal
- `$color-verde-musgo: #6B8E6F` — Color secundario
- `$color-crema: #FAF7F2` — Fondo principal
- `$color-carbon: #2D2D2D` — Texto principal
- `$color-mostaza: #D4A574` — Acento

Tipografías:
- `$font-display: 'Playfair Display'` — Para headings
- `$font-body: 'Work Sans'` — Para texto corriente

### Mixins

Siempre usar los mixins definidos en lugar de escribir CSS repetitivo:

- Responsive: `@include respond-to('md')` (breakpoints: xs, sm, md, lg, xl, xxl)
- Flexbox: `@include flex-center`, `@include flex-between`, `@include flex-column`
- Tipografía: `@include heading-display`, `@include body-text`
- Efectos: `@include card-shadow`, `@include elevation($level)`, `@include button-variant($bg, $color)`
- Imágenes: `@include image-cover`, `@include image-contain`
- Accesibilidad: `@include focus-outline`

### Naming CSS

- Usar convención **BEM** para clases propias:
  ```scss
  .navbar {}
  .navbar__brand {}
  .navbar__brand--active {}
  ```
- Clases de Bootstrap se usan directamente cuando apliquen
- Variables de componente específico (ej: `$navbar-height`) definidas en `_variables.scss`

### Responsive

- **Mobile First**: estilos base para móvil, breakpoints hacia arriba con `@include respond-to()`
- No hardcodear valores de breakpoints; usar siempre las variables:
  ```scss
  @media (max-width: $breakpoint-md) { ... }
  // o preferiblemente:
  @include respond-to('md') { ... }
  ```

---

## Git

### Commits

Formato: **Conventional Commits en español**

```
tipo(scope): descripción en español en minúsculas
```

Tipos usados en el proyecto:
- `feat` — nueva funcionalidad
- `chore` — tareas de mantenimiento, configuración, herramientas
- `fix` — corrección de bugs
- `refactor` — refactorización sin cambio de comportamiento

Scopes observados: `core`, `layout`, `models`, `directive`, `services`, `docker`, `shared`

Ejemplos reales del proyecto:
```
feat(core): agrega guardia de administrador para rutas protegidas
feat(layout): agrega layout principal y navbar responsive
chore(docker): configurar entorno Docker para desarrollo con Node 20
feat(models): añadir modelo de categoría category.model.ts
```

### Ramas

- `dev/ReSirve` — rama base de desarrollo
- `feature/<nombre-en-kebab-case>` — nuevas funcionalidades (salen de `dev/ReSirve`)
- `chore/<nombre-en-kebab-case>` — tareas de mantenimiento (salen de `dev/ReSirve`)

### Pull Requests

- PRs desde rama feature/chore hacia `dev/ReSirve`
- Merge commits con el título del PR

---

## Arquitectura

### Estructura de carpetas

```
src/app/
├── core/               # Lógica de negocio global (singleton)
│   ├── guards/         # Guards funcionales
│   ├── interceptors/   # Interceptors HTTP funcionales
│   ├── models/         # Interfaces TypeScript (modelos de API)
│   └── services/       # Servicios inyectables
├── shared/             # Elementos reutilizables entre features
│   ├── components/     # Componentes standalone reutilizables
│   ├── directives/     # Directivas standalone
│   └── pipes/          # Pipes standalone
├── layout/             # Layouts de página (main-layout, etc.)
│   └── main-layout/
└── features/           # Páginas/features (lazy loaded)
    ├── home/
    ├── catalog/
    ├── product-detail/
    └── admin/
```

### Barrel Exports (index.ts)

**Cada carpeta tiene su `index.ts`** que re-exporta todo:

```ts
// src/app/core/services/index.ts
export * from './api.service';
export * from './product.service';
// ...
```

Siempre importar desde el barrel, no desde el archivo directo:
```ts
// ✅ Correcto
import { Product, ProductFilters } from '@core/models';

// ❌ Incorrecto
import { Product } from '@core/models/product.model';
```

### Entornos

- Dos archivos: `environment.ts` (dev) y `environment.prod.ts` (prod)
- Siempre importar desde `@environments/environment`
- Usar **feature flags** en el objeto `features` para activar/desactivar funcionalidades:
  ```ts
  features: {
    chat: false,
    admin: false,
    search: true,
  }
  ```
- Las claves sensibles (API keys) nunca se hardcodean; se dejan vacías con comentario indicando el origen correcto

### Configuración de la app

- La configuración central está en `app.config.ts` (no en un NgModule)
- Los interceptors se registran en `provideHttpClient(withInterceptors([...]))`
- Router configurado con `withViewTransitions()` y `withComponentInputBinding()`
- HttpClient usa `withFetch()` (Fetch API, no XHR)

---

## Testing

- Framework: **Karma + Jasmine** (configuración Angular por defecto)
- Archivos de test: `*.spec.ts` en la misma carpeta que el archivo testeado
- Para componentes standalone, configurar el `TestBed` con `imports: [ComponentName]`:
  ```ts
  await TestBed.configureTestingModule({
    imports: [AppComponent],
  }).compileComponents();
  ```
- Los tests existentes son básicos (humo: verifica que el componente se crea)
- No hay configuración de coverage personalizada ni thresholds definidos aún

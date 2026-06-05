# 0008. Estructura de carpetas Feature-Based

## Estado

Accepted

## Contexto

La organización del código Angular puede seguir dos enfoques principales:

1. **Por tipo de archivo**: `components/`, `services/`, `models/` a nivel global.
2. **Por feature (dominio)**: `home/`, `catalog/`, `product-detail/`, cada uno con sus propios componentes, servicios y modelos.

Factores considerados:
- El proyecto es una SPA con páginas claramente delimitadas (Home, Catálogo, Detalle, About, Contact).
- Lazy loading obligatorio (ver ADR 0003) se alinea naturalmente con features autocontenidos.
- Un desarrollador que toca el catálogo debe poder encontrar TODO lo relacionado en una sola carpeta.
- Los elementos transversales (modelos compartidos, componentes UI) viven fuera de las features.

## Decisión

**Adoptar una estructura de carpetas Feature-Based con capas transversales.**

```
src/app/
├── core/               # Lógica de negocio global (singleton)
│   ├── guards/
│   ├── interceptors/
│   ├── models/         # Interfaces de API
│   └── services/       # Servicios inyectables globales
├── shared/             # Elementos reutilizables entre features
│   ├── components/     # Componentes standalone reutilizables
│   ├── directives/
│   └── pipes/
├── layout/             # Layouts de página
│   └── main-layout/
└── features/           # Páginas/features (lazy loaded)
    ├── home/
    ├── catalog/
    ├── product-detail/
    ├── about/
    ├── contact/
    └── not-found/
```

Cada feature puede contener sus propios componentes, servicios y modelos si son específicos de esa página.

## Consecuencias

### Positivas

- **Alta cohesión**: todo el código de una feature está junto; no hay que saltar entre `services/` y `components/` globales.
- **Escalabilidad**: agregar una nueva feature es crear una carpeta; no modifica archivos globales.
- **Lazy loading natural**: cada feature es un candidato directo a `loadComponent`.
- **Ownership claro**: un desarrollador puede responsabilizarse de una feature sin tocar el resto.

### Negativas

- **Duplicación potencial**: dos features pueden necesitar un modelo o servicio similar y duplicarlo en vez de compartirlo.
- **Límites borrosos**: decidir si un componente es "shared" o pertenece a una feature requiere criterio.
- **Refactor entre features**: mover un componente de una feature a otra implica cambiar rutas y posiblemente lazy loading.
- **Carga cognitiva inicial**: un nuevo desarrollador debe entender la convención de capas antes de navegar el código.

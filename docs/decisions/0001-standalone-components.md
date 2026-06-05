# 0001. Uso de Standalone Components en Angular

## Estado

Accepted

## Contexto

Angular 19 eliminó la creación de componentes con NgModule por defecto. El proyecto ReSirve comenzó con Angular 19.2, lo que planteaba la decisión de adoptar standalone components de forma completa o mantener NgModules por compatibilidad con código legacy.

Factores considerados:
- Angular 19 promueve standalone como el camino principal.
- Standalone simplifica la arquitectura: no se necesitan archivos `.module.ts` intermedios.
- Los imports se vuelven explícitos por componente, facilitando el tree-shaking.
- Todos los artefactos (componentes, pipes, directivas, guards, interceptors) pueden ser standalone.
- No hay código legacy con NgModule que justifique mantener los módulos.

## Decisión

**Adoptar standalone components en el 100% de la aplicación.**

Ningún componente, pipe, directiva, guard o interceptor usará NgModule. Todos usarán `standalone: true` y gestionarán sus propios imports.

## Consecuencias

### Positivas

- **Simplicidad**: menos archivos boilerplate, no hay `.module.ts` que mantener.
- **Tree-shaking explícito**: cada componente importa solo lo que necesita; el bundler puede eliminar lo no usado con mayor precisión.
- **Portabilidad**: un componente standalone se puede copiar a otro proyecto sin arrastrar un módulo completo.
- **Coherencia con Angular 19+**: alineado con la dirección del framework.

### Negativas

- **Curva de aprendizaje**: desarrolladores acostumbrados a NgModule necesitan adaptarse a declarar imports en cada componente.
- **Verbosity**: cada componente debe listar sus dependencias explícitamente; no hay un módulo central que las agrupe.
- **Refactor a escala**: mover un componente entre carpetas requiere ajustar imports relativos si no se usan path aliases (ver ADR 0007).

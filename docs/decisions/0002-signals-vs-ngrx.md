# 0002. Signals para estado reactivo en lugar de NgRx

## Estado

Accepted

## Contexto

El proyecto necesita gestionar estado reactivo en componentes y servicios. Las opciones principales en el ecosistema Angular son:

1. **NgRx**: Librería externa, patrón Redux (store global, actions, reducers, effects).
2. **Angular Signals**: API nativa de Angular 16+, incluida en el framework sin dependencias externas.

Factores considerados:
- El catálogo inicial tendrá ~30 productos; no se anticipa un estado global masivo.
- La complejidad del negocio es baja: mostrar productos, filtrar, ver detalle, contactar por WhatsApp.
- Signals permite estado local por componente/servicio sin boilerplate de actions y reducers.
- RxJs sigue siendo necesario para streams HTTP, pero no para estado local.

## Decisión

**Usar Angular Signals para todo el estado reactivo local.**

No se instalará NiRx. El estado global, si llega a existir en el futuro, se gestionará con signals inyectables (`providedIn: 'root'`) en servicios.

## Consecuencias

### Positivas

- **Menos boilerplate**: no hay actions, reducers, selectors ni effects para mantener.
- **Rendimiento**: signals usa cambios de estado granular (fine-grained reactivity) en vez de detección de cambios global.
- **Curva de aprendizaje**: más simple para nuevos desarrolladores; no requiere entender el patrón Redux.
- **Sin dependencias externas**: viene con Angular, no aumenta el bundle size.

### Negativas

- **Patrones no estandarizados**: NgRx impone una estructura rígida que escala bien en equipos grandes. Con signals, cada desarrollador puede organizar el estado de forma distinta.
- **DevTools**: no hay Redux DevTools para signals (aunque existen extensiones experimentales).
- **Estado global complejo**: si en el futuro el estado se vuelve altamente interconectado (múltiples features compartiendo datos complejos), puede ser necesario reevaluar esta decisión.

# ReSirve — Documento de Proyecto

> **Estado**: Fase 1 (catálogo personal, ~30 productos)
> **Última actualización**: 2026-06-05

---

## 1. Visión

**ReSirve** es un marketplace de productos usados donde cada objeto tiene una historia.

No competimos con Facebook Marketplace ni OLX en volumen. Competimos en **experiencia**. La propuesta central es que un producto usado no es una transacción fría: es un puente entre dos vidas, un objeto que merece una segunda oportunidad contada con palabras humanas.

### North Star
> "Dar una segunda vida a lo que ya no usás, con historia y confianza."

---

## 2. Fases de evolución

| Fase | Alcance | Timing |
|------|---------|--------|
| **Fase 1** | Catálogo personal (~30 productos propios). Contacto vía WhatsApp. IA como ghostwriter de historias. | Ahora |
| **Fase 2** | Multi-usuario. Vendedores externos pueden publicar. Curador visual con IA. | Futuro |
| **Fase 3** | Escalación. Newsletter personalizado. Match de energías. "El Reencuentro". | Futuro |

---

## 3. Propuesta de valor

### Para el vendedor
- Plataforma simple sin comisiones ni pasarelas de pago.
- IA que ayuda a contar la historia del objeto (reduce fricción de escritura).
- Destaque por narrativa: productos con historia ganan visibilidad.

### Para el comprador
- Descubrimiento editorial: productos curados, no listados al azar.
- Confianza mediante transparencia: historia, estado real, contacto directo.
- Sin creación de cuenta: flujo WhatsApp directo.

---

## 4. Stack tecnológico

| Capa | Tecnología | Decisión clave |
|------|------------|----------------|
| Framework | Angular 19.2 | Standalone components, signals |
| Lenguaje | TypeScript 5.7 | Modo estricto completo |
| Estilos | SCSS + Bootstrap 5 (modular) | Design system propio con tokens |
| Iconos | Bootstrap Icons | Consistencia visual |
| Estado | Angular Signals | Sin NgRx (ver ADR 0002) |
| Routing | Angular Router con lazy loading | `loadComponent` obligatorio |
| Backend | Laravel REST API | JSON sobre HTTP |
| Testing | Karma + Jasmine | Tests básicos de humo |

---

## 5. Decisiones de arquitectura clave

Las decisiones fundacionales están documentadas en [docs/decisions/](decisions/index.md):

1. **[Standalone Components](decisions/0001-standalone-components.md)** — Sin NgModule
2. **[Signals vs NgRx](decisions/0002-signals-vs-ngrx.md)** — Estado local nativo
3. **[Lazy Loading](decisions/0003-lazy-loading-obligatorio.md)** — Carga por feature
4. **[WhatsApp-only](decisions/0004-whatsapp-only.md)** — Sin carrito ni checkout
5. **[Producto con Historia](decisions/0005-producto-con-historia.md)** — Narrativa como eje central
6. **[IA como Diferenciador](decisions/0006-ia-como-diferenciador.md)** — Ghostwriter + curador visual
7. **[Path Aliases](decisions/0007-path-aliases-barrel-exports.md)** — `@core/`, `@shared/`, etc.
8. **[Feature-Based Folders](decisions/0008-feature-based-folder-structure.md)** — Organización por dominio

---

## 6. Features de IA (Roadmap)

### Fase 1 — Ahora

| Feature | Descripción | Impacto |
|---------|-------------|---------|
| **Ghostwriter de historias** | IA sugiere preguntas y genera 3 variantes de copy para la "Historia del producto". El vendedor elige y edita. | Reduce fricción del vendedor |
| **Estimador de Historia** | Badge y valoración por narrativa: productos con historia documentada ganan +visibilidad. | Incentiva historias de calidad |

### Fase 2 — Futuro

| Feature | Descripción |
|---------|-------------|
| **Curador visual** | Comprador sube foto de su espacio o describe estilo. IA sugiere productos que encajen. |
| **Álbum del Objeto** | Timeline visual del producto: foto de compra original, uso diario, decisión de venta, producto listo. |
| **Newsletter personalizado** | Email semanal con descubrimiento editorial basado en estilo y presupuesto del usuario. |

### Fase 3 — Futuro

| Feature | Descripción |
|---------|-------------|
| **Match de Energías** | Compatibilidad vendedor-comprador por estilo de vida, no solo filtros técnicos. |
| **Segunda Vida Garantida** | IA predice vida útil restante del objeto. |
| **El Reencuentro** | Contacto opcional entre ex-vendedor y nuevo comprador. Updates del objeto en su nuevo hogar. |

---

## 7. Diseño y UX

### Identidad visual
- **Estética**: "Mercado de Pulgas Moderno" — cálida, honesta, vintage refinada.
- **Modos**: Light mode (default) y Dark mode disponible en TODAS las pantallas.
- **Paleta**: Terracota + Verde musgo + Crema (light) / Azul oscuro profundo + Teal (dark).
- **Tipografía**: Playfair Display (display/headings) + Work Sans (body).

### Pantallas (rediseño aprobado en Stitch)
Todas las referencias visuales en `docs/design/`:
- `homepage-light-approved.png`
- `catalog-light-approved.png`
- `product-detail-light-approved.png`
- `about-light-approved.png`
- `contact-light-approved.png`
- `not-found-light-approved.png`
- `homepage-dark-palette-reference.png` — referencia de paleta dark

> **Nota**: Los screenshots son referencia visual. Al implementar en Angular se ajustarán tokens, espaciado y comportamientos para lograr coherencia entre modos.

---

## 8. Convenciones de código

Documentadas en detalle en [AGENTS.md](../AGENTS.md). Resumen:

- Standalone components (`standalone: true`)
- `inject()` en lugar de constructor injection
- Angular Signals para estado local
- Lazy loading obligatorio para rutas (`loadComponent`)
- Path aliases (`@core/*`, `@shared/*`, `@features/*`)
- Barrel exports (`index.ts` por carpeta)
- SCSS con BEM para clases propias, Bootstrap para utilidades
- Commits: Conventional Commits en español
- Ramas: `feature/<nombre>` y `chore/<nombre>` desde `dev/ReSirve`

---

## 9. Métricas de éxito (Fase 1)

| Métrica | Objetivo |
|---------|----------|
| Productos publicados | 30 propios |
| Productos con historia completa | >80% |
| Contactos WhatsApp generados | >50 |
| Tiempo de carga inicial (LCP) | <2.5s |
| Lighthouse score | >85 |

---

## 10. Glosario

| Término | Significado |
|---------|-------------|
| **Historia** | Narrativa personal del objeto: origen, uso, anécdotas, motivo de venta. |
| **Ghostwriter** | IA que asiste al vendedor a escribir la historia. |
| **Curador** | IA que sugiere productos al comprador basado en contexto (espacio, estilo). |
| **Mercado de Pulgas Moderno** | Estética visual: cálida, vintage refinada, no corporativa. |
| **ReSirve** | Juego de palabras: "re-usar" + "servir de nuevo" + "sirve" (funciona). |

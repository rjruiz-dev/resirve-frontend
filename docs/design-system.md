# Design System — ReSirve

> **Estado**: V1.0 — Alineado con rediseño visual Stitch (light + dark)
> **Última actualización**: 2026-06-05

---

## 1. Principios de diseño

1. **Cálido, no frío**. La interfaz transmite cercanía humana, no corporativa.
2. **La historia es el protagonista**. El diseño sirve a la narrativa, no la compite.
3. **Consistencia cross-modo**. Todos los componentes funcionan en light y dark.
4. **Mobile first**. Estilos base para móvil, breakpoints hacia arriba.
5. **Sin bordes duros**. Las separaciones se logran con background shifts, sombras suaves y espaciado ("no-line rule"). No usar `1px solid` para dividir secciones salvo en formularios.

---

## 2. Tokens de color

### 2.1 Primitive tokens (marca)

| Token | Hex | Uso |
|-------|-----|-----|
| `terracota` | `#E07856` | CTA primario, acento cálido, highlights |
| `terracota-light` | `#EB9A82` | Hover states, gradientes |
| `terracota-dark` | `#C55E3E` | Active states |
| `teal` | `#0A7E8C` | CTA secundario, stats light, badges info |
| `teal-light` | `#3DA8B5` | Hover teal, gradientes |
| `teal-dark` | `#087A86` | Active teal, gradientes profundos |
| `verde-musgo` | `#6B8E6F` | Success, disponible, gradiente hero contact |
| `verde-light` | `#8FB092` | Hover success |
| `mostaza` | `#D4A574` | Acento vintage, gradiente 404, tags |
| `mostaza-light` | `#E2C19A` | Hover mostaza |

### 2.2 Semantic tokens — Light mode

| Token | Hex | Uso |
|-------|-----|-----|
| `bg-primary` | `#FAFAFA` | Fondo de página |
| `bg-secondary` | `#FFFFFF` | Cards, modales, form containers |
| `bg-tertiary` | `#F5F0EB` | Secciones alternadas (features, stats light) |
| `bg-hero-about` | `linear-gradient(180deg, rgba(224,120,86,0.08) 0%, #FAFAFA 100%)` | Hero de About |
| `bg-hero-contact` | `linear-gradient(180deg, rgba(107,142,111,0.08) 0%, #FAFAFA 100%)` | Hero de Contact |
| `text-primary` | `#1A1A2E` | Títulos, body principal |
| `text-secondary` | `#6B7280` | Subtítulos, descripciones |
| `text-muted` | `#9CA3AF` | Placeholders, meta-info |
| `text-light` | `#FFFFFF` | Texto sobre fondos oscuros |
| `border` | `#E5E7EB` | Bordes sutiles, divisores |
| `border-focus` | `#0A7E8C` | Focus en inputs |
| `navbar-bg` | `#1A1A2E` | Navbar (oscuro en ambos modos) |
| `navbar-text` | `#FFFFFF` | Texto navbar |
| `footer-bg` | `#1A1A2E` | Footer (oscuro en ambos modos) |
| `footer-text` | `#FAF7F2` | Texto footer |
| `shadow-color` | `rgba(224,120,86,0.12)` | Tint terracota para sombras |

### 2.3 Semantic tokens — Dark mode

| Token | Hex | Uso |
|-------|-----|-----|
| `bg-primary-dark` | `#0F1729` | Fondo de página (azul muy oscuro) |
| `bg-secondary-dark` | `#1A1A2E` | Cards, modales, form containers |
| `bg-tertiary-dark` | `#162032` | Secciones alternadas |
| `bg-hero-about-dark` | `linear-gradient(180deg, rgba(224,120,86,0.12) 0%, #0F1729 100%)` | Hero de About dark |
| `bg-hero-contact-dark` | `linear-gradient(180deg, rgba(10,126,140,0.12) 0%, #0F1729 100%)` | Hero de Contact dark |
| `text-primary-dark` | `#F8FAFC` | Títulos, body principal |
| `text-secondary-dark` | `#94A3B8` | Subtítulos, descripciones |
| `text-muted-dark` | `#64748B` | Placeholders, meta-info |
| `border-dark` | `rgba(255,255,255,0.1)` | Bordes sutiles dark |
| `border-focus-dark` | `#3DA8B5` | Focus en inputs dark |
| `shadow-color-dark` | `rgba(0,0,0,0.3)` | Sombras dark |

### 2.4 Tokens de estado funcionales

| Token | Light | Dark |
|-------|-------|------|
| `success` | `#6B8E6F` | `#6B8E6F` |
| `warning` | `#D4A574` | `#D4A574` |
| `danger` | `#D9534F` | `#EF4444` |
| `info` | `#0A7E8C` | `#3DA8B5` |

### 2.5 Gradients especiales

| Token | Valor | Uso |
|-------|-------|-----|
| `gradient-404` | `linear-gradient(135deg, #E07856 0%, #D4A574 100%)` | Texto "404" (background-clip) |
| `gradient-stats` | `linear-gradient(135deg, #0A7E8C 0%, #087A86 100%)` | Stats section (light) |
| `gradient-wa` | `linear-gradient(135deg, #25D366 0%, #128C7E 100%)` | Icono/contacto WhatsApp |
| `gradient-email` | `linear-gradient(135deg, #E07856 0%, #D4A574 100%)` | Icono/contacto Email |
| `gradient-ig` | `linear-gradient(135deg, #E1306C 0%, #F77737 100%)` | Icono/contacto Instagram |

---

## 3. Tipografía

### 3.1 Familias

| Rol | Fuente | Fallback |
|-----|--------|----------|
| Display / Headings | Playfair Display | Georgia, serif |
| Body / UI | Work Sans | -apple-system, BlinkMacSystemFont, sans-serif |

### 3.2 Escala tipográfica

| Token | Mobile | Desktop (≥768px) | Peso | Uso |
|-------|--------|-------------------|------|-----|
| `display-xl` | 3rem | 4.5rem | 700 | H1 hero ("Acerca de ReSirve") |
| `display-lg` | 2.5rem | 3.5rem | 700 | H1 página |
| `display-md` | 2rem | 2.5rem | 700 | H2 sección |
| `heading-lg` | 1.75rem | 2rem | 700 | H3 sub-sección |
| `heading-md` | 1.5rem | 1.75rem | 600 | H4 |
| `heading-sm` | 1.25rem | 1.5rem | 600 | H5 |
| `body-lg` | 1.125rem | 1.25rem | 400 | Lead text, subtítulos hero |
| `body-md` | 1rem | 1rem | 400 | Body principal |
| `body-sm` | 0.875rem | 0.875rem | 400 | Descripciones cortas |
| `label` | 0.75rem | 0.75rem | 600 | Badges, meta, uppercase + tracking |

### 3.3 Reglas

- **Letter-spacing**: -0.02em en display/headings (editorial, apretado). +0.05em en labels (mayúsculas, espaciado amplio).
- **Line-height**: 1.1 en display, 1.2 en headings, 1.6 en body.
- **Font-weight**: 400 body, 600 semibold, 700 bold. NO usar 300 (ilegible en modo oscuro).

---

## 4. Espaciado

### 4.1 Scale

| Token | Valor | Uso |
|-------|-------|-----|
| `space-xs` | 0.25rem (4px) | Gap ícono-texto, padding interno micro |
| `space-sm` | 0.5rem (8px) | Badge padding, gap entre inline items |
| `space-md` | 1rem (16px) | Padding interno de componentes |
| `space-lg` | 1.5rem (24px) | Gap entre cards, padding de secciones pequeñas |
| `space-xl` | 2rem (32px) | Padding de cards, gap entre secciones |
| `space-2xl` | 3rem (48px) | Sección padding vertical mobile |
| `space-3xl` | 4rem (64px) | Sección padding vertical desktop |
| `space-hero` | 5rem (80px) | Hero padding vertical |

### 4.2 Reglas de layout

- **Max-width**: `1200px` para contenedor principal. Hero y stats pueden ser full-width.
- **Container padding**: `space-md` mobile, `space-xl` desktop.
- **Section gap**: `space-3xl` entre secciones principales.
- **Grid gap**: `space-lg` entre cards, `space-xl` entre bloques grandes.

---

## 5. Sombras y elevación

### 5.1 Light mode

| Token | Valor | Uso |
|-------|-------|-----|
| `shadow-sm` | `0 2px 8px rgba(224,120,86,0.08)` | Tarjetas estáticas |
| `shadow-md` | `0 4px 16px rgba(224,120,86,0.12)` | Tarjetas hover, dropdowns |
| `shadow-lg` | `0 8px 24px rgba(224,120,86,0.16)` | Modales, toasts |
| `shadow-xl` | `0 12px 40px rgba(224,120,86,0.20)` | Tooltips, elementos flotantes |

### 5.2 Dark mode

| Token | Valor | Uso |
|-------|-------|-----|
| `shadow-sm-dark` | `0 2px 8px rgba(0,0,0,0.3)` | Tarjetas estáticas dark |
| `shadow-md-dark` | `0 4px 16px rgba(0,0,0,0.4)` | Tarjetas hover dark |
| `shadow-lg-dark` | `0 8px 24px rgba(0,0,0,0.5)` | Modales dark |

### 5.3 Principio

En light mode las sombras tienen **tinte terracota** (cálido). En dark mode son **neutras oscuras** (no tinte de color). Esto evita que el modo oscuro se vea "sucio".

---

## 6. Radios de borde

| Token | Valor | Uso |
|-------|-------|-----|
| `radius-sm` | 0.375rem (6px) | Botones, inputs |
| `radius-md` | 0.625rem (10px) | Tarjetas pequeñas |
| `radius-lg` | 1rem (16px) | Tarjetas, modales |
| `radius-xl` | 1.5rem (24px) | Hero containers, featured cards |
| `radius-full` | 9999px | Pills, avatares, icon containers circulares |

---

## 7. Componentes

### 7.1 Button

**Variantes**:

| Variante | Background | Texto | Border | Hover (light) | Hover (dark) |
|----------|------------|-------|--------|---------------|--------------|
| `primary` | `terracota` | `white` | none | `terracota-dark` | `terracota-light` |
| `secondary` | `teal` | `white` | none | `teal-dark` | `teal-light` |
| `outline` | transparent | `text-primary` | `1px solid border` | bg `bg-tertiary` | bg `bg-tertiary-dark` |
| `ghost` | transparent | `text-primary` | none | bg `bg-tertiary` | bg `bg-tertiary-dark` |

**Sizes**:
- `sm`: padding `space-sm space-md`, font `body-sm`
- `md`: padding `space-md space-lg`, font `body-md`
- `lg`: padding `space-md space-xl`, font `body-lg`

**Estados**:
- `disabled`: opacity 0.5, cursor not-allowed, no hover
- `loading`: spinner + texto, pointer-events none

### 7.2 Card

**Estructura**:
- Background: `bg-secondary` (light) / `bg-secondary-dark` (dark)
- Border-radius: `radius-lg`
- Shadow: `shadow-sm` → `shadow-md` on hover
- Padding: `space-xl`
- Hover: `translateY(-4px)` + shadow upgrade

**Tipos**:
- `default`: contenido genérico
- `feature`: icono circular arriba, centrado
- `product`: imagen top, contenido bottom, badge top-left
- `suggestion`: icono + label, compacta

### 7.3 Input / Form

**Field**:
- Background: `bg-secondary` (light) / `bg-secondary-dark` (dark)
- Border: `1px solid border` (light) / `1px solid border-dark` (dark)
- Border-radius: `radius-sm`
- Padding: `space-md space-lg`
- Focus: `border-color: border-focus` + `box-shadow: 0 0 0 3px rgba(10,126,140,0.2)`
- Error: `border-color: danger` + mensaje debajo en `danger`
- Placeholder: `text-muted` / `text-muted-dark`

**Label**: `body-sm`, font-weight 600, margin-bottom `space-xs`

### 7.4 Navbar

**Estructura** (identica en light/dark):
- Background: `navbar-bg` (#1A1A2E)
- Texto: `navbar-text` (#FFFFFF)
- Height: 70px
- Position: sticky top
- Shadow: `0 2px 8px rgba(0,0,0,0.15)`

**Elementos**:
- Logo izquierda: "ReSirve" (terracota + blanco)
- Search bar centro: input redondeado, placeholder "Buscar productos..."
- Links derecha: Inicio, Catálogo, Acerca de, Contacto
- Link activo: underline o color `teal-light`
- Mobile: hamburger menu, overlay full-screen

### 7.5 Footer

**Estructura** (identica en light/dark):
- Background: `footer-bg` (#1A1A2E)
- Texto: `footer-text` (#FAF7F2)
- Padding: `space-3xl` vertical
- Layout: 4 columnas desktop, 2 tablet, 1 mobile

**Columnas**:
1. Brand + tagline + social icons (IG, FB, WhatsApp)
2. NAVEGACIÓN: Inicio, Catálogo, Acerca de, Contacto
3. CATEGORÍAS: Electrodomésticos, Muebles, Deportes, Tecnología, Ropa, Hogar
4. CONTACTO: +54 9 11 31234-5678, hola@resirve.com, Buenos Aires, Argentina

**Bottom bar**:
- Border-top: `1px solid rgba(255,255,255,0.1)`
- Copyright left, Privacy Policy | Terms of Service right

### 7.6 Badge / Condition

| Estado | Background | Texto |
|--------|------------|-------|
| `excellent` | `#22C55E` | `#FFFFFF` |
| `good` | `#D4A574` (mostaza) | `#FFFFFF` |
| `fair` | `#F97316` | `#FFFFFF` |
| `featured` | `#0A7E8C` (teal) | `#FFFFFF` |

- Border-radius: `radius-full` (pill)
- Padding: `space-xs space-sm`
- Font: `label` (uppercase, letter-spacing +0.05em)

---

## 8. Animaciones

### 8.1 Transiciones base

| Token | Valor | Uso |
|-------|-------|-----|
| `transition-fast` | `0.15s ease` | Opacity, color |
| `transition-base` | `0.3s ease` | Transform, shadow, border |
| `transition-slow` | `0.5s ease` | Layout shifts |

### 8.2 Easing

| Token | Valor | Uso |
|-------|-------|-----|
| `ease-smooth` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default |
| `ease-bounce` | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Badges, notificaciones |

### 8.3 Keyframes definidos

**`float`** (icono 404):
```css
0% { transform: translateY(0); }
50% { transform: translateY(-10px); }
100% { transform: translateY(0); }
```
- Duration: 3s
- Timing: ease-in-out
- Iteration: infinite

**`fade-in-up`**:
```css
0% { opacity: 0; transform: translateY(20px); }
100% { opacity: 1; transform: translateY(0); }
```
- Duration: 0.5s
- Timing: ease-out

---

## 9. Breakpoints (Mobile First)

| Token | Valor | Uso |
|-------|-------|-----|
| `bp-sm` | 576px | Móvil grande |
| `bp-md` | 768px | Tablet |
| `bp-lg` | 992px | Desktop |
| `bp-xl` | 1200px | Desktop grande |
| `bp-xxl` | 1400px | Desktop extra grande |

### 9.1 Responsive patterns

- **Grids**: 1 col mobile → 2 col tablet → 3-4 col desktop
- **Hero padding**: `space-2xl` mobile → `space-hero` desktop
- **Font sizes**: Escalan +1 nivel en desktop (ver sección 3.2)
- **Navbar search**: Oculta en mobile, visible en md+
- **Footer columns**: 1 mobile → 2 tablet → 4 desktop

---

## 10. Dark mode — Reglas de implementación

### 10.1 Estrategia

Usar **CSS custom properties** en `:root` y `[data-theme="dark"]`:

```scss
:root {
  --bg-primary: #FAFAFA;
  --bg-secondary: #FFFFFF;
  // ... light tokens
}

[data-theme="dark"] {
  --bg-primary: #0F1729;
  --bg-secondary: #1A1A2E;
  // ... dark tokens
}
```

### 10.2 Reglas de conversión light → dark

| Elemento | Light | Dark |
|----------|-------|------|
| Fondo página | `#FAFAFA` | `#0F1729` |
| Card/surface | `#FFFFFF` | `#1A1A2E` |
| Texto principal | `#1A1A2E` | `#F8FAFC` |
| Texto secundario | `#6B7280` | `#94A3B8` |
| Bordes | `#E5E7EB` | `rgba(255,255,255,0.1)` |
| Sombras | tint terracota | neutro oscuro |
| Gradientes | mismos colores, ajustar opacidad de inicio | mantener dirección, aumentar opacidad del tinte |

### 10.3 Excepciones (no cambian entre modos)

- **Navbar**: siempre `#1A1A2E` + texto blanco
- **Footer**: siempre `#1A1A2E` + texto crema
- **Colores de marca**: terracota, teal, verde-musgo, mostaza (iguales)
- **Botones primarios/segundarios**: mismos colores, ajustar hover
- **Badges de condición**: mismos colores (excellent verde, good mostaza, fair naranja)

### 10.4 Toggle de tema

- Ubicación: ícono de sol/luna en navbar, a la derecha de los links
- Persistencia: `localStorage` + `prefers-color-scheme` como fallback
- Transición: `transition: background-color 0.3s ease, color 0.3s ease` en `body`

---

## 11. Assets e iconografía

### 11.1 Iconos

- **Set principal**: Bootstrap Icons (`bi-*`)
- **Tamaño default**: 1.25rem (20px)
- **Tamaño lg**: 1.5rem (24px)
- **Tamaño xl**: 2rem (32px) — para feature icons en círculo
- **Tamaño display**: 3rem (48px) — para values section

### 11.2 Ilustraciones

- Estilo: Ilustraciones flat, cálidas, con personajes diversos
- Tono: Comunitario, amigable, no corporativo
- Uso: Hero sections, estados vacíos, error pages

---

## 12. Checklist de consistencia

Antes de marcar una pantalla como "lista", verificar:

- [ ] Navbar idéntico en todas las páginas (logo, search, links, mobile menu)
- [ ] Footer idéntico en todas las páginas (4 columnas, links correctos)
- [ ] Paleta coherente: terracota para acentos cálidos, teal para acciones/estados
- [ ] Tipografía: Playfair Display en títulos grandes, Work Sans en body
- [ ] Espaciado: secciones separadas por `space-3xl`, contenido interno con `space-xl`
- [ ] Cards: sombra suave, hover con lift, sin bordes duros
- [ ] Botones: 3 variantes (primary terracota, secondary teal, outline)
- [ ] Modo oscuro: todos los componentes tienen tokens dark definidos
- [ ] Responsive: mobile-first, grids colapsan de 4→2→1
- [ ] Animaciones: hover en cards suaves, no bruscas

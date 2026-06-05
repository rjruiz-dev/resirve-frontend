# Tasks: Visual Redesign — "Mercado de Pulgas Moderno"

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 800–1200 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 (Foundation) → PR 2 (Shared Components) → PR 3 (Feature Pages) |
| Delivery strategy | ask-on-risk |
| Chain strategy | feature-branch-chain |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Foundation: tokens, ThemeService, global styles | PR 1 | Base branch; tests/docs included |
| 2 | Shared components: navbar, footer, card, badge | PR 2 | Depends on PR 1 |
| 3 | Feature pages: all 6 pages restyled | PR 3 | Depends on PR 1+2 |

## Phase 1: Foundation

- [x] 1.1 Create `src/styles/_dark-tokens.scss` with `:root` and `[data-theme="dark"]` custom properties per design-system §2.
- [x] 1.2 Update `src/styles/_variables.scss` with primitive tokens (teal, new colors) and remap existing variables.
- [x] 1.3 Update `src/styles/_mixins.scss` with `button-variant` sizes, `dark-aware-shadow`, `stagger-animation`.
- [x] 1.4 Update `src/styles/_bootstrap-overrides.scss` to reference new tokens and add dark-mode overrides.
- [x] 1.5 Update `src/styles/styles.scss`: import `_dark-tokens.scss`, add `body` transition, add `float`/`fade-in-up` keyframes.
- [x] 1.6 Update `index.html`: add initial theme script in `<head>` to prevent FOUC.
- [x] 1.7 Create `src/app/core/services/theme.service.ts` with `localStorage` persistence, `prefers-color-scheme` fallback, and `data-theme` toggle.
- [x] 1.8 Export `theme.service.ts` from `src/app/core/services/index.ts`.
- [x] 1.9 Create `theme.service.spec.ts`: test init, toggle, localStorage read/write, `prefers-color-scheme` fallback.

## Phase 2: Shared Components

- [x] 2.1 Redesign `navbar` (`.ts`, `.html`, `.scss`): dark `#1A1A2E` bg, centered search (hidden mobile), theme toggle, teal-light active links.
- [x] 2.2 Create `navbar.component.spec.ts`: creation, mobile toggle, theme toggle interaction.
- [x] 2.3 Redesign `footer` (`.ts`, `.html`, `.scss`): 4-column layout per design-system §7.5, social icons, bottom bar, WhatsApp link.
- [x] 2.4 Create `footer.component.spec.ts`: creation, WhatsApp href, category count.
- [x] 2.5 Update `product-card` (`.scss`): `bg-secondary` token, `radius-lg`, terracota-tinted shadows, `translateY(-4px)` hover.
- [x] 2.6 Create `product-card.component.spec.ts`: creation, dark mode class structure.
- [x] 2.7 Update `badge` (`.ts`, `.html`, `.scss`): add variants (`excellent`, `good`, `fair`, `featured`), `radius-full`, uppercase label.
- [x] 2.8 Create `badge.component.spec.ts`: creation, variant class rendering.

## Phase 3: Feature Pages

- [x] 3.1 Restyle `home` (`.html`, `.scss`): hero, grids, button variants, section spacing, typography tokens.
- [x] 3.2 Create `home.component.spec.ts`: creation smoke test.
- [x] 3.3 Restyle `catalog` (`.html`, `.scss`): filters, responsive grid 1→2→3→4, pagination, tokens.
- [x] 3.4 Create `catalog.component.spec.ts`: creation smoke test.
- [x] 3.5 Restyle `product-detail` (`.html`, `.scss`): gallery, info, contact form, related products with tokens.
- [x] 3.6 Create `product-detail.component.spec.ts`: creation smoke test.
- [x] 3.7 Restyle `about` (`.html`, `.scss`): `bg-hero-about` gradient, stats, values sections.
- [x] 3.8 Create `about.component.spec.ts`: creation smoke test.
- [x] 3.9 Restyle `contact` (`.html`, `.scss`): `bg-hero-contact` gradient, form inputs with teal focus, error states.
- [x] 3.10 Create `contact.component.spec.ts`: creation, form validation smoke test.
- [x] 3.11 Restyle `not-found` (`.html`, `.scss`): `gradient-404`, `float` keyframe, suggestions.
- [x] 3.12 Create `not-found.component.spec.ts`: creation smoke test.

## Phase 4: Verification

- [ ] 4.1 Run `npm test`; all Karma+Jasmine tests pass with zero regressions.
- [ ] 4.2 Run `npm run build`; grep compiled CSS for `--bg-primary` and `[data-theme="dark"]`.
- [ ] 4.3 Verify responsive behavior at 375px, 768px, and 1200px viewports.
- [ ] 4.4 Verify dark mode toggle persists across reloads on all routes.
- [ ] 4.5 Verify no functional regressions: WhatsApp links, form validation, routing, lazy loading.

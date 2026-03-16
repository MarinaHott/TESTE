# Design System Guidelines

## General guidelines

* Use `DM Sans` as the sole typeface across the entire application
* Always reference CSS custom properties (variables) defined in the `:root` block — never hard-code color or shadow values inline
* Use flexbox and grid for layout; only fall back to absolute positioning when strictly necessary
* Keep components small and focused; extract reusable helpers into their own files
* Refactor as you go to keep file sizes manageable

---

## Design system guidelines

### Colors

#### Primary

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#4A3AFF` | CTAs, links, active states, brand accent |

#### Gradients

| Name | Direction | Value |
|---|---|---|
| Vertical | top → bottom | `#4A3AFF → #6D3AFF` |
| Horizontal | left → right | `#4A3AFF → #6D3AFF` |

CSS:
```css
--gradient-vertical:   linear-gradient(180deg, #4A3AFF 0%, #6D3AFF 100%);
--gradient-horizontal: linear-gradient(90deg,  #4A3AFF 0%, #6D3AFF 100%);
```

#### Neutral Colors

| Token | Hex | Role |
|---|---|---|
| `--color-headings-black` | `#0D0A2C` | Heading text |
| `--color-text-gray` | `#615E83` | Body text, labels, muted content |
| `--color-600` | `#807E9A` | Borders, dividers, placeholder text |
| `--color-500` | `#E5E5EF` | Subtle dividers, disabled states |
| `--color-400` | `#F2F1FF` | Hover backgrounds, tag backgrounds |
| `--color-300` | `#F7F7FB` | Card backgrounds, input backgrounds |
| `--color-200` | `#F8F8FF` | Page section backgrounds |
| `--color-white` | `#FFFFFF` | Pure white — cards, modals, nav |

Rules:
* Use `--color-headings-black` for all `<h1>`–`<h6>` and display text
* Use `--color-text-gray` for paragraphs, captions, and secondary labels
* Never use raw black (`#000`) — always use `--color-headings-black`

#### Purple Shades

| Token | Hex | Notes |
|---|---|---|
| `--purple-800` | `#0B0086` | Darkest — backgrounds, overlays |
| `--purple-700` | `#0F00B3` | Dark emphasis |
| `--purple-600` | `#3B2BEB` | Strong accent |
| `--purple-500` | `#766AFF` | Secondary accent |
| `--purple-400` | `#A9A2FF` | Hover tints |
| `--purple-300` | `#C8C3FF` | Light accents |
| `--purple-200` | `#E1DEFF` | Very light tints |
| `--purple-100` | `#F0EEFF` | Barely-there tints, chip fills |

---

### Typography

**Font family:** `DM Sans` (Google Fonts)
**Weights in use:** 400 (Regular) · 500 (Medium) · 700 (Bold)

Always import:
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
```

#### Special Headings (Display)

| Name | Size | Weight | Line-height |
|---|---|---|---|
| Display 1 | 116px | 700 | 120px |
| Display 2 | 88px | 700 | 95px |
| Display 3 | 64px | 700 | 72px |
| Display 4 | 38px | 700 | 64px |

#### Headings

| Name | Size | Weight | Line-height |
|---|---|---|---|
| H1 | 80px | 700 | 90px |
| H2 | 64px | 700 | 74px |
| H3 | 42px | 700 | 54px |
| H4 | 38px | 700 | 50px |
| H5 | 32px | 700 | 42px |
| H6 | 28px | 700 | 38px |

#### Body

| Name | Size | Weight | Line-height |
|---|---|---|---|
| Body Large | 36px | 400 | 58px |
| Body Default | 24px | 400 | 42px |
| Body Small | 18px | 400 | 32px |
| Body Smaller | 16px | 400 | 28px |

#### Text Single

| Scale | Size | Line-height | Weights |
|---|---|---|---|
| 400 | 30px | 32px | 400 / 500 / 700 |
| 300 | 20px | 22px | 400 / 500 / 700 |
| 200 | 18px | 20px | 400 / 500 / 700 |
| 100 | 16px | 18px | 400 / 500 / 700 |

#### Text Single Uppercase

Same sizes as Text Single, plus `letter-spacing: 10px` and `text-transform: uppercase`.

Rules:
* Use Display styles only for hero sections and landing banners — one per viewport
* Use H1 once per page; H2–H6 follow a strict hierarchy
* Body Default is the baseline for paragraphs and cards
* Uppercase text uses a 10px letter-spacing — never apply tracking to lowercase body copy

---

### Spacing

Use a base-8 spacing scale. Common values:

| Token | Value | Use |
|---|---|---|
| `4px` | `0.25rem` | Tight gaps (icon to label) |
| `8px` | `0.5rem` | Inline gaps, badge padding |
| `16px` | `1rem` | Component internal padding |
| `24px` | `1.5rem` | Card padding |
| `32px` | `2rem` | Between related blocks |
| `40px` | `2.5rem` | Section sub-groups |
| `80px` | `5rem` | Major section vertical gap |
| `120px` | `7.5rem` | Page-level vertical padding |

---

### Border Radius

| Use case | Radius |
|---|---|
| Small elements (badges, chips, inputs) | `6px` |
| Buttons | `8px` |
| Cards | `18px` |
| Large feature cards / frames | `24px` |
| Avatars / icon containers | `50%` |

---

### Shadows

#### General Shadows (elevation system)

Apply shadows to card and panel elements. Heavier shadows signal higher elevation.

| Name | CSS Value | Use |
|---|---|---|
| Shadow 01 | `0px 2px 6px rgba(13,10,44,0.08)` | Default card, lowest elevation |
| Shadow 02 | `0px 4px 12px rgba(13,10,44,0.06)` | Resting panels |
| Shadow 03 | `0px 2px 16px rgba(13,10,44,0.12)` | Slightly raised cards |
| Shadow 04 | `0px 13px 40px rgba(13,10,44,0.22), 0px -8px 18px rgba(13,10,44,0.04)` | Floating cards, popovers |
| Shadow 05 | `0px 10px 30px rgba(74,58,255,0.10), 0px 4px 10px rgba(13,10,44,0.02), 0px -18px 38px rgba(74,58,255,0.04)` | Primary accent cards |
| Shadow 06 | `0px 12px 34px rgba(13,10,44,0.08), 0px 34px 26px rgba(13,10,44,0.05)` | Modals, dialogs |

CSS variables:
```css
--shadow-01: 0px 2px 6px 0px rgba(13,10,44,0.08);
--shadow-02: 0px 4px 12px 0px rgba(13,10,44,0.06);
--shadow-03: 0px 2px 16px 0px rgba(13,10,44,0.12);
--shadow-04: 0px 13px 40px 0px rgba(13,10,44,0.22), 0px -8px 18px 0px rgba(13,10,44,0.04);
--shadow-05: 0px 10px 30px 0px rgba(74,58,255,0.10), 0px 4px 10px 0px rgba(13,10,44,0.02), 0px -18px 38px 0px rgba(74,58,255,0.04);
--shadow-06: 0px 12px 34px 0px rgba(13,10,44,0.08), 0px 34px 26px 0px rgba(13,10,44,0.05);
```

#### Button Shadows

Two families — **Color** (purple, for primary buttons) and **Default** (neutral, for ghost/secondary buttons). Three intensity levels each.

| Name | CSS Value | Use |
|---|---|---|
| Button Color 01 | `0px 7px 8px rgba(74,58,255,0.13)` | Small primary button, resting |
| Button Color 02 | `0px 15px 16px rgba(74,58,255,0.22)` | Medium primary button, hover |
| Button Color 03 | `0px 15px 30px rgba(74,58,255,0.20)` | Large primary button, hover |
| Button Default 01 | `0px 8px 8px rgba(13,10,44,0.08)` | Small default button, resting |
| Button Default 02 | `0px 8px 16px rgba(13,10,44,0.17)` | Medium default button, hover |
| Button Default 03 | `0px 8px 30px rgba(13,10,44,0.15)` | Large default button, hover |

CSS variables:
```css
--btn-shadow-color-1:   0px 7px 8px 0px rgba(74,58,255,0.13);
--btn-shadow-color-2:   0px 15px 16px 0px rgba(74,58,255,0.22);
--btn-shadow-color-3:   0px 15px 30px 0px rgba(74,58,255,0.20);
--btn-shadow-default-1: 0px 8px 8px 0px rgba(13,10,44,0.08);
--btn-shadow-default-2: 0px 8px 16px 0px rgba(13,10,44,0.17);
--btn-shadow-default-3: 0px 8px 30px 0px rgba(13,10,44,0.15);
```

Rules:
* Always apply `--shadow-01` or higher to cards — never use flat, unshadowed cards
* Use `--shadow-05` when a card uses the primary purple gradient or background
* Increment the shadow level on `:hover` to signal interactivity (e.g., `--shadow-01` → `--shadow-03`)
* Button Color shadows are only used on buttons with `background: --color-primary`
* Never apply a Color button shadow to a neutral/ghost button

---

### Effects & Transitions

* All interactive shadow changes use `transition: box-shadow 0.2s ease`
* Hover scale on cards: `transform: translateY(-2px)` with `transition: transform 0.2s ease`
* Do not use `transition: all` — always specify the properties being animated

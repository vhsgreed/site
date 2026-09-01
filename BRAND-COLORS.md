# Brand Color Tokens — canonical (2026-09-01)

Reference for all site/OG/image work. Source of truth: `prod/site/src/styles/global.css`.

| Token | Hex | Use |
|---|---|---|
| `--accent-strong` | `#A3E635` | Vivid acid-lime. Surfaces/underlines on LIGHT backgrounds carrying dark ink; accents on DARK backgrounds. Never put white text on it (1.8:1). |
| `--accent-ink` | `#4D7C0F` | **CANONICAL DARK LIME.** Surfaces carrying white text (buttons, badges, ::selection, dark-mode OG card). White on it = 5:1 (AA). |
| `--accent` (light) | `#65A30D` | Links/text on white. |
| `--accent` (dark) | `#A3E635` | Links/text on dark. |
| `--ink` | `#0A0A0A` / `#F2F2F2` | Text, light/dark. |
| `--bg` | `#FFFFFF` / `#0C0C0C` | Background, light/dark. |

## Mist backgrounds (Karl-rendered, 09-01, Gemini)
- `public/img/mist-full.webp` (25 KB) — full-bleed lime+black mist on white. OG share-card base (`public/img/og-card.jpg`, 79 KB, 1200×630, brand mark + wordmark composited).
- `public/img/mist-hero.webp` (13 KB) — hero variant, clean white center for text.
- Dark-mode OG card: same mist concept, but black background + darker lime mist (`#4D7C0F`-family), white text. Prompt when needed.

## Rule
Any surface that carries white text uses `--accent-ink` (#4D7C0F), never `--accent-strong`.
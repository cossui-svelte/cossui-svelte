# Fonts

Font files served statically by the SvelteKit app. Anything in `static/` is available at the site root, so `static/fonts/CalSansVF.woff2` is served as `/fonts/CalSansVF.woff2`.

## Available fonts

| File | Family (CSS) | Used for |
| --- | --- | --- |
| `CalSansVF.woff2` | `CalSansUI` (400–700), `CalSansHeading` (700) | Body text and headings |
| `CalSansVF-Italic.woff2` | `CalSansUI` (italic) | Italic body text |
| `PaperMono-Regular.woff2` | `PaperMono` | Code and monospace UI |

Cal Sans is version 2.010 (variable font).

## How they are wired

Fonts are declared with `@font-face` at the top of [`src/app.css`](../../src/app.css) and exposed as CSS variables:

```css
:root {
  --font-heading: "CalSansHeading", sans-serif;
  --font-sans: "CalSansUI", sans-serif;
  --font-mono: "PaperMono", monospace;
}
```

Tailwind v4 maps these to the `font-sans`, `font-heading` and `font-mono` utilities. `src/app.html` sets `font-sans` on `<body>`, so no per-page import is needed. Apply `font-heading` to titles, with `font-bold` or `font-semibold` as needed:

```svelte
<h1 class="font-heading font-bold">Title</h1>
<code class="font-mono">pnpm dev</code>
```

## Using a different heading font

Point `--font-heading` at another family in `src/app.css`:

```css
:root {
  --font-heading: "YourHeadingFont", sans-serif;
}
```

## Adding a new font

1. Place the `.woff2` file in this directory.
2. Declare it in `src/app.css`:

```css
@font-face {
  font-display: swap;
  font-family: "YourFont";
  src: url("/fonts/YourFont.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
}
```

3. Expose it through a CSS variable (e.g. `--font-your-name`) in the `:root` block, and map it in the Tailwind theme if you want a utility class.

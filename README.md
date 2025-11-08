# @vltansky/tailwindcss-rtl-first

A Tailwind CSS plugin that provides RTL-first directional utilities. Instead of writing separate LTR and RTL styles, this plugin automatically handles bidirectional layouts by swapping directional properties based on the `dir` attribute.

## Features

- 🔄 Automatic RTL/LTR property swapping for margin, padding, inset, borders, and text alignment
- 🎯 Uses logical property mappings (e.g., `ml-4` becomes `margin-right` in LTR, `margin-left` in RTL)
- ⚡ Works with Tailwind CSS v4
- 🎨 Supports all Tailwind spacing, color, and sizing scales
- 📦 Zero configuration required

## Installation

```bash
npm install @vltansky/tailwindcss-rtl-first tailwindcss@^4.0.0
```

## Usage

### With CSS (Recommended for v4)

Add the plugin to your main CSS file:

```css
@plugin "@vltansky/tailwindcss-rtl-first";
@import "tailwindcss";
```

### With PostCSS

If you're using PostCSS, create a `postcss.config.mjs`:

```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

### HTML Setup

Add the `dir` attribute to your HTML:

```html
<!-- For LTR (Left-to-Right) languages -->
<html dir="ltr">
  <body>
    <div class="ml-4 mr-8">
      <!-- ml-4 becomes margin-right: 1rem -->
      <!-- mr-8 becomes margin-left: 2rem -->
    </div>
  </body>
</html>

<!-- For RTL (Right-to-Left) languages -->
<html dir="rtl">
  <body>
    <div class="ml-4 mr-8">
      <!-- ml-4 becomes margin-left: 1rem -->
      <!-- mr-8 becomes margin-right: 2rem -->
    </div>
  </body>
</html>
```

## How It Works

The plugin overrides Tailwind's directional utilities to swap left/right properties based on the `dir` attribute:

| Utility Class | LTR Behavior                                             | RTL Behavior                                             |
| ------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `ml-4`        | `margin-right: 1rem`                                     | `margin-left: 1rem`                                      |
| `mr-4`        | `margin-left: 1rem`                                      | `margin-right: 1rem`                                     |
| `pl-4`        | `padding-right: 1rem`                                    | `padding-left: 1rem`                                     |
| `pr-4`        | `padding-left: 1rem`                                     | `padding-right: 1rem`                                    |
| `left-0`      | `right: 0`                                               | `left: 0`                                                |
| `right-0`     | `left: 0`                                                | `right: 0`                                               |
| `text-left`   | `text-align: end`                                        | `text-align: left`                                       |
| `text-right`  | `text-align: start`                                      | `text-align: right`                                      |
| `rounded-l`   | `border-top-right-radius` + `border-bottom-right-radius` | `border-top-left-radius` + `border-bottom-left-radius`   |
| `rounded-r`   | `border-top-left-radius` + `border-bottom-left-radius`   | `border-top-right-radius` + `border-bottom-right-radius` |
| `border-l`    | `border-right-width`                                     | `border-left-width`                                      |
| `border-r`    | `border-left-width`                                      | `border-right-width`                                     |

## Supported Utilities

The plugin provides RTL-aware versions of:

- **Margin**: `m*`, `mx`, `ml`, `mr`
- **Padding**: `p*`, `px`, `pl`, `pr`
- **Inset**: `inset-x`, `left`, `right`
- **Scroll Margin**: `scroll-m*`, `scroll-mx`, `scroll-ml`, `scroll-mr`
- **Scroll Padding**: `scroll-p*`, `scroll-px`, `scroll-pl`, `scroll-pr`
- **Border Radius**: `rounded-*` (all directional variants)
- **Border Width**: `border-x`, `border-l`, `border-r`
- **Border Color**: `border-x-*`, `border-l-*`, `border-r-*`
- **Text Align**: `text-left`, `text-right`

## Tailwind CSS v4 Notes

### CSS Variable Approach

In Tailwind v4, the plugin generates both the base utilities and RTL/LTR-scoped versions. The scoped versions use higher specificity (`body[dir="rtl"] &` and `body[dir="ltr"] &`) to override the base utilities.

### No Core Plugin Disabling

Unlike v3, Tailwind v4 doesn't support disabling core plugins via configuration. The plugin works by generating additional utilities with higher specificity that override the default behavior.

### Cascade Behavior

Because v4 generates both base utilities and RTL/LTR-scoped versions, both properties may be set on an element. For example, `ml-4` will generate:

```css
.ml-4 {
  margin-left: 1rem; /* Base Tailwind utility */
}

body[dir="ltr"] .ml-4 {
  margin-right: 1rem; /* RTL-first override */
}

body[dir="rtl"] .ml-4 {
  margin-left: 1rem; /* RTL-first override */
}
```

The scoped versions win due to higher specificity, but both sides of the margin are technically set. This is generally not an issue, but if you need strict single-side properties, see the Advanced Usage section below.

## Advanced Usage

### Strict Reset Mode (Optional)

If you need to ensure only one side of a property is set (zeroing the opposite side), you can add this CSS to your project:

```css
@layer utilities {
  /* Reset opposite margins for RTL utilities */
  body[dir="ltr"] .ml-1,
  body[dir="ltr"] .ml-2,
  body[dir="ltr"] .ml-3,
  body[dir="ltr"] .ml-4,
  body[dir="ltr"] .ml-5,
  body[dir="ltr"] .ml-6,
  body[dir="ltr"] .ml-8,
  body[dir="ltr"] .ml-10,
  body[dir="ltr"] .ml-12,
  body[dir="ltr"] .ml-16,
  body[dir="ltr"] .ml-20,
  body[dir="ltr"] .ml-24 {
    margin-left: 0 !important;
  }

  body[dir="rtl"] .ml-1,
  body[dir="rtl"] .ml-2,
  body[dir="rtl"] .ml-3,
  body[dir="rtl"] .ml-4,
  body[dir="rtl"] .ml-5,
  body[dir="rtl"] .ml-6,
  body[dir="rtl"] .ml-8,
  body[dir="rtl"] .ml-10,
  body[dir="rtl"] .ml-12,
  body[dir="rtl"] .ml-16,
  body[dir="rtl"] .ml-20,
  body[dir="rtl"] .ml-24 {
    margin-right: 0 !important;
  }

  /* Repeat for mr-*, pl-*, pr-*, etc. */
}
```

**Note**: This is rarely needed and adds CSS bloat. The default behavior (both sides set with correct specificity) works correctly for virtually all use cases.

## Testing

Run the unit test suite:

```bash
npm test
```

Run end-to-end test (separate from unit tests, verifies actual CSS generation with v4):

```bash
npm run test:e2e
```

**Note**: The E2E test runs outside Jest and directly tests the Tailwind v4 compilation pipeline.

## Example

```html
<!DOCTYPE html>
<html dir="ltr">
  <head>
    <link href="/dist/output.css" rel="stylesheet" />
  </head>
  <body>
    <div class="flex">
      <!-- In LTR: margin-right: 1rem -->
      <!-- In RTL: margin-left: 1rem -->
      <div class="ml-4">Content</div>

      <!-- In LTR: padding-left: 2rem -->
      <!-- In RTL: padding-right: 2rem -->
      <div class="pr-8">Content</div>

      <!-- In LTR: text-align: end -->
      <!-- In RTL: text-align: left -->
      <p class="text-left">Text</p>
    </div>
  </body>
</html>
```

## Migration from v3

If you're upgrading from a v3-compatible version:

1. Update to Tailwind CSS v4
2. Remove `corePlugins` configuration (no longer needed)
3. Use `@plugin` directive in CSS instead of JavaScript config
4. Test your layouts - the behavior should be identical

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

# Brand Assets

Source-of-truth brand assets for all Wegoby projects.

## Structure

```
assets/
├── logo/           # Logo files
│   ├── wegoby-image-logo.png      # Raster logo
│   ├── wegoby-image-logo-x2.png   # 2x resolution
│   ├── wegoby-image-logo-x3.png   # 3x resolution
│   ├── wegoby-vector-logo.svg     # Vector logo
│   └── wegoby-source-logo.ai      # Source file (Adobe Illustrator)
│
└── favicon/        # Favicon files
    ├── favicon.ico            # Legacy ICO format
    ├── favicon.svg            # Modern SVG favicon
    ├── favicon-96x96.png      # PNG favicon
    ├── apple-touch-icon.png   # iOS home screen
    ├── web-app-manifest-192x192.png  # PWA icon
    ├── web-app-manifest-512x512.png  # PWA icon large
    └── site.webmanifest       # Web app manifest
```

## Usage

### Logo Usage

| Variant | Use Case |
|---------|----------|
| `wegoby-vector-logo.svg` | Web, scalable contexts |
| `wegoby-image-logo.png` | Standard resolution displays |
| `wegoby-image-logo-x2.png` | Retina/HiDPI displays |
| `wegoby-image-logo-x3.png` | Extra high resolution |

### Favicon Usage

Copy the entire `favicon/` folder to your project's `public/` directory:

```bash
cp -r branding/assets/favicon/* your-project/public/
```

Add to HTML `<head>`:

```html
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
```

## Guidelines

- **Never modify** source assets in this folder
- **Copy** assets to projects, don't symlink
- **Maintain** proper spacing around logo (see `images.json`)
- **Use vector** (SVG) when possible for crisp rendering

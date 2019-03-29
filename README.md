# pwa-starter

A minimal starter kit for your PWA (Progressive Web App)

## Whats in it?

- Webpack v4
- SCSS
- PWA (Progress Web App)
  - Service Workers through [offline-plugin](https://github.com/NekR/offline-plugin)
  - Manifest.json through [webpack-pwa-manifest](https://github.com/arthurbergmz/webpack-pwa-manifest)
- Babel v7
  - Support for ES6+

## Install and Run

```
  git clone https://github.com/ta-dachi/pwa-starter
  npm install
  npm run dev
```

## Directory Layout

```bash
├── /dist/                      # The output (via Webpack)
├── /src/                       # Source files
│   ├── /assets/                # Image, fonts, and other asset files
│   ├── /css/                   # SCSS/CSS files
├── package.json                # List of project dependencies
├── webpack.dev.js              # Webpack for development
├── webpack.prod.js             # Webpack for production
```

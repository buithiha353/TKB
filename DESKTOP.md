# TKB THCS Desktop

This project can run as an offline Windows desktop app with Tauri.

## Storage model

- The desktop app stores data locally through the existing Zustand localStorage store.
- Data transfer between machines is done with JSON backup/restore from the Settings page.
- Desktop export/import uses native Windows file dialogs through Tauri.

## Requirements

Install these once on the build machine:

1. Node.js 24.x or compatible
2. Rust and Cargo from https://rustup.rs
3. Visual Studio Build Tools with the C++ workload
4. Microsoft WebView2 Runtime, usually already available on Windows 10/11

## Commands

```bash
npm install
npm run desktop:web:build
npm run desktop:build
```

On Windows, if your terminal cannot find `link.exe`, use:

```bash
npm run desktop:build:win
```

The desktop executable is generated at:

```text
src-tauri/target/release/tkb-thcs.exe
```

The Windows installer is generated under:

```text
src-tauri/target/release/bundle/nsis/
```

## Development

```bash
npm run desktop:dev
```

The desktop build uses `vite.desktop.config.ts` and outputs static files into `dist-desktop`.
The web/Vercel build still uses `vite.config.ts`.

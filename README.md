# sync-brave

![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen?style=flat-square&logo=node.js&logoColor=white)
![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey?style=flat-square)
![Brave](https://img.shields.io/badge/Brave-Browser-fb542b?style=flat-square&logo=brave&logoColor=white)
![Puppeteer](https://img.shields.io/badge/puppeteer--core-23.x-40b5a4?style=flat-square&logo=puppeteer&logoColor=white)

Trigger Brave browser sync externally via Chrome DevTools Protocol.

## Installation

```bash
pnpm install
```

## Usage

```bash
pnpm start
```

Or run directly:

```bash
node src/main.js
```

## What it does

1. Launches Brave browser with remote debugging enabled
2. Opens `brave://sync-internals/`
3. Clicks the "Trigger GetUpdates" button to force a sync
4. Closes the browser

## Supported Platforms

The script auto-detects your OS and uses the default Brave path:

| Platform | Default Path |
|----------|--------------|
| macOS    | `/Applications/Brave Browser.app/Contents/MacOS/Brave Browser` |
| Windows  | `C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe` |
| Linux    | `/usr/bin/brave-browser`, `/usr/bin/brave`, `/snap/bin/brave` |

If Brave is installed elsewhere, edit `getBravePath()` in `src/main.js`.

## Requirements

- Node.js 18+
- Brave Browser installed
- [puppeteer-core](https://github.com/puppeteer/puppeteer) (installed via npm/pnpm)

## License

MIT - see [LICENSE](LICENSE.md)

This project uses [puppeteer-core](https://github.com/puppeteer/puppeteer) which is licensed under the Apache License 2.0.

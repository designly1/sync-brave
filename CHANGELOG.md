# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.1] - 2025-12-01

### Added

- Author section in README

## [1.2.0] - 2025-12-01

### Added

- npx support: run with `npx sync-brave`
- npm package configuration (repository, bugs, homepage, engines, files)
- npm version badge in README

## [1.1.0] - 2025-12-01

### Added

- Install script (`install.sh`) with Node 20 installer via nvm
- Auto-installs pnpm via corepack if missing

## [1.0.0] - 2025-12-01

### Added

- Initial release
- Trigger Brave sync via Chrome DevTools Protocol
- Uses puppeteer-core to automate browser interaction
- Cross-platform support: auto-detects macOS, Windows, and Linux
- Searches common Brave install locations on Linux


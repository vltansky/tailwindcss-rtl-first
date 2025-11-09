# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-01-08

### Changed

- **BREAKING**: Updated to Tailwind CSS v4 compatibility
- **BREAKING**: Removed `disabledCorePlugins` export (no longer supported in v4)
- **BREAKING**: Plugin must now be loaded via `@plugin` directive in CSS instead of JavaScript config
- Simplified internal utilities to not depend on Tailwind v3 internals
- Updated build system to use `--strip-leading-paths` for correct output structure

### Added

- E2E test suite to verify CSS generation with v4
- Comprehensive v4 usage documentation in README
- Advanced usage section documenting cascade behavior
- Optional strict-reset mode documentation
- PostCSS configuration examples
- Migration guide from v3 to v4

### Removed

- Complex CSS compilation tests (replaced with simpler E2E tests)
- Dependency on internal Tailwind utilities (`transformThemeValue`, `withAlphaVariable`, `toColorValue`)
- `corePlugins.test.js` (v3-specific test)

### Fixed

- Jest configuration to properly handle ES modules
- Import paths for `flattenColorPalette` to use v4 exports

### Notes

- In v4, both base utilities and RTL/LTR-scoped versions are generated
- RTL/LTR versions use higher specificity (`body[dir] &`) to override base utilities
- The plugin works identically to v1.x from a user perspective
- No configuration changes needed beyond loading method

## [1.0.0] - Previous Release

- Initial release with Tailwind CSS v3 support
- RTL-first directional utilities
- Support for margin, padding, inset, borders, and text alignment

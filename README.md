# ExsColour 🎨

A comprehensive colour system for Engine projects with British English spelling consistency.

## Features

- ✅ **British English spelling** - Colour (not Color) throughout
- ✅ **Complete colour system** - Constants, utilities, algorithms, classes
- ✅ **Multiple colour formats** - HEX, RGB, HSL, CMYK, LAB, XYZ
- ✅ **Accessibility tools** - WCAG contrast checking, accessible palette generation
- ✅ **Colour manipulation** - Darken, lighten, saturate, mix, invert, grayscale
- ✅ **Palette management** - Create, sort, filter, quantize palettes
- ✅ **Gradient generation** - Linear, radial, conic gradients
- ✅ **Theme system** - Complete colour schemes with CSS variable export
- ✅ **Performance optimized** - Cached calculations, efficient algorithms
- ✅ **Fully tested** - Unit and integration tests with high coverage

## Installation

```bash
npm install exscolour
```

Quick Start

```javascript
import ExsColour from 'exscolour';

// Create a colour
const red = ExsColour.createColour('#FF0000');
console.log(red.toHSL()); // hsl(0, 100%, 50%)

// Create a palette
const palette = ExsColour.createPalette(['#FF0000', '#00FF00', '#0000FF'], 'primary');

// Create a gradient
const gradient = ExsColour.createGradient([
  { colour: '#FF0000', position: 0 },
  { colour: '#0000FF', position: 1 }
]);

// Create a theme
const theme = ExsColour.createScheme({
  primary: '#1A73E8',
  background: '#FFFFFF',
  text: '#202124'
});

// Use the manager
const manager = ExsColour.createManager();
manager.registerPalette(palette);
manager.registerScheme(theme);
```

Documentation

· API Documentation
· Examples
· Contributing Guide

Examples

Check the examples/ directory for complete usage examples:

```bash
npm run example:basic    # Basic usage
npm run example:palette  # Palette generator
npm run example:gradient # Gradient editor
npm run example:theme    # Theme builder
```

Testing

```bash
npm test           # Run all tests
npm run test:watch # Watch mode
npm run test:coverage # With coverage
```

Browser Support

· Chrome 50+
· Firefox 45+
· Safari 10+
· Edge 79+

License

MIT © Exs Engine Development Team

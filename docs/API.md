# ExsColour API Documentation

## Installation

```bash
npm install exscolour
```

Importing

```javascript
// Import the entire system
import ExsColour from 'exscolour';

// Import specific modules
import { ExsColour } from 'exscolour/colour';
import { ExsColourPalette } from 'exscolour/palette';
import { ExsColourUtils } from 'exscolour/utils';
```

Core Classes

ExsColour

The main colour class for creating and manipulating colours.

```javascript
// Create a colour
const colour = new ExsColour('#FF0000');

// Create using factory method
const colour = ExsColour.createColour('rgb(255, 0, 0)');

// Static constructors
const fromRGB = ExsColour.fromRGB(255, 0, 0);
const fromHSL = ExsColour.fromHSL(0, 100, 50);
const random = ExsColour.random();
```

Properties

· rgb - Get RGB object { r, g, b }
· rgba - Get RGBA object { r, g, b, a }
· hsl - Get HSL object { h, s, l }
· lab - Get LAB object { l, a, b }
· alpha - Get/set alpha value (0-1)
· format - Get colour format
· temperature - Get colour temperature in Kelvin

Methods

· toHex(includeAlpha) - Convert to hex string
· toRGB() - Convert to RGB string
· toRGBA() - Convert to RGBA string
· toHSL() - Convert to HSL string
· toHSLA() - Convert to HSLA string
· toCMYK() - Convert to CMYK object
· darken(percentage) - Darken colour
· lighten(percentage) - Lighten colour
· saturate(percentage) - Adjust saturation
· complementary() - Get complementary colour
· invert() - Invert colour
· grayscale() - Convert to grayscale
· mix(otherColour, weight) - Mix with another colour
· contrastRatio(otherColour) - Calculate contrast ratio
· deltaE(otherColour) - Calculate colour difference
· clone() - Create a copy
· toJSON() - Serialize to JSON

ExsColourPalette

Collection of related colours.

```javascript
// Create palette
const palette = new ExsColourPalette(['#FF0000', '#00FF00'], 'my-palette');

// Using factory method
const palette = ExsColour.createPalette(['#FF0000', '#00FF00'], 'my-palette');
```

Static Methods

· fromImage(imageData, paletteSize, name) - Create from image data
· fromTheme(theme, variant) - Create from predefined theme
· monochromatic(base, steps) - Create monochromatic palette
· analogous(base, spread, steps) - Create analogous palette
· complementary(base, additional) - Create complementary palette
· triadic(base) - Create triadic palette
· tetradic(base, angle) - Create tetradic palette

Instance Methods

· add(colour) - Add colour to palette
· remove(index) - Remove colour by index
· sort(property, ascending) - Sort palette
· filter(predicate) - Filter palette
· createGradient(stepsPerSegment) - Create gradient palette
· quantize(maxColours, method) - Reduce number of colours
· findNearest(target) - Find nearest colour
· getStatistics() - Get palette statistics
· checkAccessibility(level) - Check accessibility
· export(format) - Export in various formats
· clone() - Create a copy

ExsColourGradient

Smooth colour transitions.

```javascript
// Create gradient
const gradient = new ExsColourGradient([
  { colour: '#FF0000', position: 0 },
  { colour: '#0000FF', position: 1 }
], 'linear');
```

Static Methods

· between(start, end, stops) - Create gradient between two colours
· rainbow(stops) - Create rainbow gradient

Instance Methods

· addStop(colour, position) - Add colour stop
· removeStop(index) - Remove colour stop
· getColourAt(position) - Get colour at position
· toPalette(steps) - Convert to colour palette
· toCSS(direction) - Generate CSS gradient
· reverse() - Reverse gradient

ExsColourScheme

Complete colour system for themes.

```javascript
// Create scheme
const scheme = new ExsColourScheme({
  primary: '#1A73E8',
  background: '#FFFFFF',
  text: '#202124'
});
```

Static Methods

· light(primary) - Create light theme
· dark(primary) - Create dark theme
· highContrast() - Create high contrast theme
· fromJSON(json) - Create from JSON
· fromPalette(palette, mapping) - Create from palette

Instance Methods

· validateAccessibility() - Validate accessibility
· generateVariants(base, variants) - Generate colour variants
· toCSSVariables(prefix) - Export as CSS variables
· toJSON() - Serialize to JSON

ExsColourManager

Central management for colours, palettes, and schemes.

```javascript
const manager = new ExsColourManager();
```

Methods

· registerPalette(palette) - Register palette
· registerScheme(scheme) - Register scheme
· registerGradient(gradient, name) - Register gradient
· getPalette(id) - Get palette by ID
· getScheme(name) - Get scheme by name
· getGradient(name) - Get gradient by name
· createPaletteFromImage(imageData, options) - Create palette from image
· generateAccessiblePalette(base, options) - Generate accessible palette
· findNearestColour(target) - Find nearest colour in all palettes
· export() - Export manager state
· import(state) - Import manager state

Utilities

ExsColourUtils

Pure utility functions for colour operations.

```javascript
import { ExsColourUtils } from 'exscolour/utils';

// Validation
ExsColourUtils.isValid('#FF0000'); // true
ExsColourUtils.isNamedColour('red'); // true

// Parsing
ExsColourUtils.parseToRGBA('#FF0000'); // { r: 255, g: 0, b: 0, a: 1 }

// Conversion
ExsColourUtils.rgbaToHex({ r: 255, g: 0, b: 0 }); // '#ff0000'
ExsColourUtils.hslToRGB(0, 100, 50); // { r: 255, g: 0, b: 0 }
ExsColourUtils.rgbaToHSL({ r: 255, g: 0, b: 0 }); // { h: 0, s: 100, l: 50 }

// Calculations
ExsColourUtils.calculateLuminance({ r: 255, g: 0, b: 0 }); // 0.2126
ExsColourUtils.calculateContrastRatio('#FFFFFF', '#000000'); // 21

// Manipulation
ExsColourUtils.darken('#FF0000', 20); // '#cc0000'
ExsColourUtils.lighten('#000000', 50); // '#808080'
ExsColourUtils.mix('#FF0000', '#0000FF', 0.5); // '#800080'
ExsColourUtils.random(); // random colour

// Accessibility
ExsColourUtils.isAccessibleContrast('#FFFFFF', '#000000', 'AA', 'normal'); // true
```

ExsColourAlgorithm

Mathematical algorithms for colour processing.

```javascript
import { ExsColourAlgorithm } from 'exscolour/algorithm';

// Basic math
ExsColourAlgorithm.lerp(0, 100, 0.5); // 50
ExsColourAlgorithm.clamp(150, 0, 100); // 100

// Easing functions
ExsColourAlgorithm.Easing.easeInOutQuad(0.5); // 0.5

// Colour space algorithms
const lab = ExsColourAlgorithm.ColourSpaceAlgorithm.rgbToLAB({ r: 255, g: 0, b: 0 });
const deltaE = ExsColourAlgorithm.ColourSpaceAlgorithm.deltaE76(lab1, lab2);
const cmyk = ExsColourAlgorithm.ColourSpaceAlgorithm.rgbToCMYK({ r: 255, g: 0, b: 0 });

// Quantization
const quantized = ExsColourAlgorithm.ColourQuantization.medianCut(colours, 8);

// Image processing
const palette = ExsColourAlgorithm.extractPaletteFromImage(imageData, 8);

// Colour temperature
const temp = ExsColourAlgorithm.calculateColourTemperature({ r: 255, g: 0, b: 0 });
```

Constants

ExsConstantsColour

```javascript
import * as ExsConstants from 'exscolour/constants';

// Formats
ExsConstants.ExsColourFormat.HEX; // 'HEX'
ExsConstants.ExsColourFormat.RGB; // 'RGB'

// Colour spaces
ExsConstants.ExsColourSpace.SRGB; // 'sRGB'

// Base colours
ExsConstants.ExsBaseColour.RED; // '#FF0000'
ExsConstants.ExsBaseColour.BLUE; // '#0000FF'

// Material colours
ExsConstants.ExsMaterialColour.RED[500]; // '#F44336'

// Exs themes
ExsConstants.ExsTheme.UI_PRIMARY; // '#1A73E8'

// Data visualization
ExsConstants.ExsDataVisualization.QUALITATIVE; // array of colours

// Accessibility standards
ExsConstants.ExsAccessibility.CONTRAST_RATIO.AA_NORMAL; // 4.5

// Defaults
ExsConstants.ExsDefaults.FORMAT; // 'HEX'
```

Browser Support

· Chrome 50+
· Firefox 45+
· Safari 10+
· Edge 79+

License

MIT © Exs Engine Development Team

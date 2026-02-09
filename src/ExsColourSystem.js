/**
 * Main Exs Colour System Entry Point
 * @module ExsColourSystem
 * @author Exs Engine Development Team
 * @version 3.2.1
 * @license MIT
 */

// Export all core modules
export * from './core/ExsConstantsColour.js';
export * from './core/ExsColourUtils.js';
export * from './core/ExsColourAlgorithm.js';

// Export all classes
export { ExsColour } from './classes/ExsColour.js';
export { ExsColourPalette } from './classes/ExsColourPalette.js';
export { ExsColourGradient } from './classes/ExsColourGradient.js';
export { ExsColourScheme } from './classes/ExsColourScheme.js';
export { ExsColourManager } from './classes/ExsColourManager.js';

// Import for default export
import * as ExsConstants from './core/ExsConstantsColour.js';
import ExsColourUtils from './core/ExsColourUtils.js';
import ExsColourAlgorithm from './core/ExsColourAlgorithm.js';
import { ExsColour } from './classes/ExsColour.js';
import { ExsColourPalette } from './classes/ExsColourPalette.js';
import { ExsColourGradient } from './classes/ExsColourGradient.js';
import { ExsColourScheme } from './classes/ExsColourScheme.js';
import { ExsColourManager } from './classes/ExsColourManager.js';

/**
 * Main Exs Colour System Singleton
 * @namespace ExsColourSystem
 */
const ExsColourSystem = {
    // Version
    version: ExsConstants.ExsMetadata.VERSION,
    
    // Core Classes
    ExsColour,
    ExsColourPalette,
    ExsColourGradient,
    ExsColourScheme,
    ExsColourManager,
    
    // Utilities
    ExsColourUtils,
    ExsColourAlgorithm,
    
    // Constants
    ExsConstants,
    
    // Factory Methods
    createColour: (value, format) => new ExsColour(value, format),
    createPalette: (colours, name) => new ExsColourPalette(colours, name),
    createGradient: (stops, type) => new ExsColourGradient(stops, type),
    createScheme: (config) => new ExsColourScheme(config),
    createManager: () => new ExsColourManager(),
    
    // Quick Access
    colours: ExsConstants.ExsBaseColour,
    themes: ExsConstants.ExsTheme,
    material: ExsConstants.ExsMaterialColour,
    
    // Helper Functions
    isValidColour: ExsColourUtils.isValid,
    parseColour: ExsColourUtils.parseToRGBA,
    calculateContrast: ExsColourUtils.calculateContrastRatio,
    mixColours: ExsColourUtils.mix
};

// Default export
export default ExsColourSystem;

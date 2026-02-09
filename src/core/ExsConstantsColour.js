/**
 * Comprehensive colour constants for Exs Engine projects
 * @module ExsConstantsColour
 * @author Exs Engine Development Team
 * @version 3.2.1
 * @license MIT
 */

/**
 * Colour format enumerations
 * @readonly
 * @enum {string}
 */
export const ExsColourFormat = Object.freeze({
    HEX: 'HEX',
    HEXA: 'HEXA',
    RGB: 'RGB',
    RGBA: 'RGBA',
    HSL: 'HSL',
    HSLA: 'HSLA',
    CMYK: 'CMYK',
    NAMED: 'NAMED'
});

/**
 * Colour space enumerations
 * @readonly
 * @enum {string}
 */
export const ExsColourSpace = Object.freeze({
    SRGB: 'sRGB',
    DISPLAY_P3: 'Display-P3',
    REC2020: 'Rec.2020',
    ADOBE_RGB: 'AdobeRGB',
    PROPHOTO: 'ProPhoto'
});

/**
 * Base colour constants - British English spelling maintained
 * @readonly
 * @enum {string}
 */
export const ExsBaseColour = Object.freeze({
    RED: '#FF0000',
    GREEN: '#00FF00',
    BLUE: '#0000FF',
    YELLOW: '#FFFF00',
    CYAN: '#00FFFF',
    MAGENTA: '#FF00FF',
    ORANGE: '#FFA500',
    CHARTREUSE: '#7FFF00',
    SPRING_GREEN: '#00FF7F',
    AZURE: '#007FFF',
    VIOLET: '#8A2BE2',
    ROSE: '#FF007F',
    BLACK: '#000000',
    WHITE: '#FFFFFF',
    GRAY: '#808080',
    GREY: '#808080'
});

/**
 * Material Design colour palette
 * @readonly
 */
export const ExsMaterialColour = Object.freeze({
    RED: { 50: '#FFEBEE', 100: '#FFCDD2', 200: '#EF9A9A', 300: '#E57373', 400: '#EF5350', 500: '#F44336', 600: '#E53935', 700: '#D32F2F', 800: '#C62828', 900: '#B71C1C' },
    BLUE: { 50: '#E3F2FD', 100: '#BBDEFB', 200: '#90CAF9', 300: '#64B5F6', 400: '#42A5F5', 500: '#2196F3', 600: '#1E88E5', 700: '#1976D2', 800: '#1565C0', 900: '#0D47A1' },
    GREEN: { 50: '#E8F5E9', 100: '#C8E6C9', 200: '#A5D6A7', 300: '#81C784', 400: '#66BB6A', 500: '#4CAF50', 600: '#43A047', 700: '#388E3C', 800: '#2E7D32', 900: '#1B5E20' },
    YELLOW: { 50: '#FFFDE7', 100: '#FFF9C4', 200: '#FFF59D', 300: '#FFF176', 400: '#FFEE58', 500: '#FFEB3B', 600: '#FDD835', 700: '#FBC02D', 800: '#F9A825', 900: '#F57F17' },
    PURPLE: { 50: '#F3E5F5', 100: '#E1BEE7', 200: '#CE93D8', 300: '#BA68C8', 400: '#AB47BC', 500: '#9C27B0', 600: '#8E24AA', 700: '#7B1FA2', 800: '#6A1B9A', 900: '#4A148C' }
});

/**
 * Exs-specific colour themes
 * @readonly
 */
export const ExsTheme = Object.freeze({
    UI_PRIMARY: '#1A73E8',
    UI_SECONDARY: '#5F6368',
    UI_SUCCESS: '#34A853',
    UI_WARNING: '#FBBC04',
    UI_ERROR: '#EA4335',
    UI_DISABLED: '#DADCE0',
    
    BACKGROUND_PRIMARY: '#FFFFFF',
    BACKGROUND_SECONDARY: '#F8F9FA',
    BACKGROUND_TERTIARY: '#E8EAED',
    
    TEXT_PRIMARY: '#202124',
    TEXT_SECONDARY: '#5F6368',
    TEXT_TERTIARY: '#9AA0A6',
    TEXT_INVERSE: '#FFFFFF',
    
    BORDER_LIGHT: '#DADCE0',
    BORDER_MEDIUM: '#9AA0A6',
    BORDER_DARK: '#5F6368',
    
    HOVER_OVERLAY: 'rgba(32, 33, 36, 0.04)',
    FOCUS_RING: 'rgba(26, 115, 232, 0.4)',
    SELECTION: 'rgba(26, 115, 232, 0.12)'
});

/**
 * Data visualization colours
 * @readonly
 */
export const ExsDataVisualization = Object.freeze({
    QUALITATIVE: ['#4285F4', '#EA4335', '#34A853', '#FBBC04', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'],
    SEQUENTIAL: ['#F6F8FE', '#D2DFFC', '#AEC6FB', '#8AADF9', '#6694F8', '#4285F4', '#3B78E2', '#346BD0'],
    DIVERGING: ['#EA4335', '#F6A69E', '#FDE6E3', '#E8F0FE', '#AEC6FB', '#4285F4']
});

/**
 * Accessibility colour contrast standards
 * @readonly
 */
export const ExsAccessibility = Object.freeze({
    CONTRAST_RATIO: {
        AA_NORMAL: 4.5,
        AA_LARGE: 3.0,
        AAA_NORMAL: 7.0,
        AAA_LARGE: 4.5
    },
    MINIMUM_LUMINANCE: 0.45,
    MAXIMUM_LUMINANCE: 0.55
});

/**
 * Colour transformation constants
 * @readonly
 */
export const ExsTransformation = Object.freeze({
    GAMMA: { SRGB: 2.2, LINEAR: 1.0 },
    RANGE: {
        HUE_MIN: 0, HUE_MAX: 360,
        SATURATION_MIN: 0, SATURATION_MAX: 100,
        LIGHTNESS_MIN: 0, LIGHTNESS_MAX: 100,
        ALPHA_MIN: 0, ALPHA_MAX: 1
    },
    MATRIX: {
        RGB_TO_XYZ: [
            [0.4124564, 0.3575761, 0.1804375],
            [0.2126729, 0.7151522, 0.0721750],
            [0.0193339, 0.1191920, 0.9503041]
        ]
    }
});

/**
 * Default colour configurations
 * @readonly
 */
export const ExsDefaults = Object.freeze({
    FORMAT: ExsColourFormat.HEX,
    SPACE: ExsColourSpace.SRGB,
    ALPHA: 1.0,
    FALLBACK: ExsBaseColour.BLACK
});

/**
 * Utility functions for colour validation
 * @readonly
 */
export const ExsValidation = Object.freeze({
    REGEX: {
        HEX: /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
        HEXA: /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/,
        RGB: /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
        RGBA: /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0|1|0?\.\d+)\s*\)$/,
        HSL: /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/,
        HSLA: /^hsla\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(0|1|0?\.\d+)\s*\)$/
    },
    VALID_FORMATS: Object.values(ExsColourFormat),
    VALID_SPACES: Object.values(ExsColourSpace)
});

/**
 * Exs colour version and metadata
 * @readonly
 */
export const ExsMetadata = Object.freeze({
    VERSION: '3.2.1',
    CREATED: '2024-01-15',
    UPDATED: '2024-11-27',
    AUTHOR: 'Exs Colour Standards Committee',
    COMPATIBILITY: {
        MIN_ENGINE_VERSION: '4.0.0',
        BROWSER_SUPPORT: 'Chrome 50+, Firefox 45+, Safari 10+, Edge 79+'
    }
});

// Re-export all constants
export default {
    ExsColourFormat,
    ExsColourSpace,
    ExsBaseColour,
    ExsMaterialColour,
    ExsTheme,
    ExsDataVisualization,
    ExsAccessibility,
    ExsTransformation,
    ExsDefaults,
    ExsValidation,
    ExsMetadata
};

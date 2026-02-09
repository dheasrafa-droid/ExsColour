/**
 * Comprehensive colour utilities for Exs Engine projects
 * @module ExsColourUtils
 * @requires ExsConstantsColour
 * @author Exs Engine Development Team
 * @version 3.2.1
 * @license MIT
 */

import {
    ExsColourFormat,
    ExsBaseColour,
    ExsValidation,
    ExsTransformation,
    ExsDefaults,
    ExsAccessibility
} from './ExsConstantsColour.js';

export class ExsColourUtils {
    static isValid(colourString, format = null) {
        if (!colourString || typeof colourString !== 'string') return false;
        
        const trimmed = colourString.trim().toLowerCase();
        
        if (this.isNamedColour(trimmed)) return true;
        
        if (format) {
            switch (format) {
                case ExsColourFormat.HEX: return ExsValidation.REGEX.HEX.test(trimmed);
                case ExsColourFormat.HEXA: return ExsValidation.REGEX.HEXA.test(trimmed);
                case ExsColourFormat.RGB: return ExsValidation.REGEX.RGB.test(trimmed);
                case ExsColourFormat.RGBA: return ExsValidation.REGEX.RGBA.test(trimmed);
                case ExsColourFormat.HSL: return ExsValidation.REGEX.HSL.test(trimmed);
                case ExsColourFormat.HSLA: return ExsValidation.REGEX.HSLA.test(trimmed);
                default: return false;
            }
        }
        
        return Object.values(ExsValidation.REGEX).some(regex => regex.test(trimmed));
    }

    static isNamedColour(colourName) {
        const normalized = colourName.toUpperCase().replace(/\s+/g, '');
        return Object.keys(ExsBaseColour).some(key => key === normalized);
    }

    static parseToRGBA(colourString) {
        if (!colourString) throw new Error('Colour string is required');
        
        const trimmed = colourString.trim().toLowerCase();
        
        if (this.isNamedColour(trimmed)) {
            const hex = this.getHexFromName(trimmed);
            return this.hexToRGBA(hex);
        }
        
        if (ExsValidation.REGEX.HEX.test(trimmed)) return this.hexToRGBA(trimmed);
        if (ExsValidation.REGEX.HEXA.test(trimmed)) return this.hexaToRGBA(trimmed);
        if (ExsValidation.REGEX.RGB.test(trimmed)) return this.rgbStringToRGBA(trimmed);
        if (ExsValidation.REGEX.RGBA.test(trimmed)) return this.rgbaStringToRGBA(trimmed);
        if (ExsValidation.REGEX.HSL.test(trimmed)) return this.hslStringToRGBA(trimmed);
        if (ExsValidation.REGEX.HSLA.test(trimmed)) return this.hslaStringToRGBA(trimmed);
        
        throw new Error(`Invalid colour format: ${colourString}`);
    }

    static hexToRGBA(hex) {
        const cleanHex = hex.replace('#', '');
        let r, g, b;
        
        if (cleanHex.length === 3) {
            r = parseInt(cleanHex[0] + cleanHex[0], 16);
            g = parseInt(cleanHex[1] + cleanHex[1], 16);
            b = parseInt(cleanHex[2] + cleanHex[2], 16);
        } else if (cleanHex.length === 6) {
            r = parseInt(cleanHex.substring(0, 2), 16);
            g = parseInt(cleanHex.substring(2, 4), 16);
            b = parseInt(cleanHex.substring(4, 6), 16);
        } else {
            throw new Error(`Invalid hex colour: ${hex}`);
        }
        
        return { r, g, b, a: ExsDefaults.ALPHA };
    }

    static rgbaToHex(rgba, includeAlpha = false) {
        const toHex = (value) => {
            const hex = Math.round(value).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        
        const hex = `#${toHex(rgba.r)}${toHex(rgba.g)}${toHex(rgba.b)}`;
        
        if (includeAlpha && rgba.a !== undefined && rgba.a < 1) {
            const alphaHex = toHex(rgba.a * 255);
            return hex + alphaHex;
        }
        
        return hex;
    }

    static hslToRGB(h, s, l) {
        h = h % 360;
        if (h < 0) h += 360;
        s = Math.min(100, Math.max(0, s)) / 100;
        l = Math.min(100, Math.max(0, l)) / 100;
        
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = l - c / 2;
        
        let r, g, b;
        if (h >= 0 && h < 60) [r, g, b] = [c, x, 0];
        else if (h >= 60 && h < 120) [r, g, b] = [x, c, 0];
        else if (h >= 120 && h < 180) [r, g, b] = [0, c, x];
        else if (h >= 180 && h < 240) [r, g, b] = [0, x, c];
        else if (h >= 240 && h < 300) [r, g, b] = [x, 0, c];
        else [r, g, b] = [c, 0, x];
        
        return {
            r: Math.round((r + m) * 255),
            g: Math.round((g + m) * 255),
            b: Math.round((b + m) * 255)
        };
    }

    static rgbaToHSL(rgba) {
        const r = rgba.r / 255;
        const g = rgba.g / 255;
        const b = rgba.b / 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const delta = max - min;
        
        let h = 0;
        let s = 0;
        const l = (max + min) / 2;
        
        if (delta !== 0) {
            s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
            
            if (max === r) h = (g - b) / delta + (g < b ? 6 : 0);
            else if (max === g) h = (b - r) / delta + 2;
            else h = (r - g) / delta + 4;
            
            h *= 60;
        }
        
        return {
            h: Math.round(h),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    }

    static calculateLuminance(rgb) {
        const sRGB = (value) => {
            value /= 255;
            return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
        };
        
        const r = sRGB(rgb.r);
        const g = sRGB(rgb.g);
        const b = sRGB(rgb.b);
        
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    static calculateContrastRatio(colour1, colour2) {
        const rgba1 = typeof colour1 === 'string' ? this.parseToRGBA(colour1) : colour1;
        const rgba2 = typeof colour2 === 'string' ? this.parseToRGBA(colour2) : colour2;
        
        const l1 = this.calculateLuminance(rgba1);
        const l2 = this.calculateLuminance(rgba2);
        
        const lighter = Math.max(l1, l2);
        const darker = Math.min(l1, l2);
        
        return (lighter + 0.05) / (darker + 0.05);
    }

    static darken(colour, percentage) {
        const rgba = this.parseToRGBA(colour);
        const hsl = this.rgbaToHSL(rgba);
        hsl.l = Math.max(0, hsl.l - percentage);
        const newRGBA = this.hslToRGB(hsl.h, hsl.s, hsl.l);
        return this.rgbaToHex({ ...newRGBA, a: rgba.a });
    }

    static lighten(colour, percentage) {
        const rgba = this.parseToRGBA(colour);
        const hsl = this.rgbaToHSL(rgba);
        hsl.l = Math.min(100, hsl.l + percentage);
        const newRGBA = this.hslToRGB(hsl.h, hsl.s, hsl.l);
        return this.rgbaToHex({ ...newRGBA, a: rgba.a });
    }

    static mix(colour1, colour2, weight = 0.5) {
        const rgba1 = this.parseToRGBA(colour1);
        const rgba2 = this.parseToRGBA(colour2);
        
        const w = Math.max(0, Math.min(1, weight));
        const w2 = 1 - w;
        
        const r = Math.round(rgba1.r * w + rgba2.r * w2);
        const g = Math.round(rgba1.g * w + rgba2.g * w2);
        const b = Math.round(rgba1.b * w + rgba2.b * w2);
        const a = rgba1.a * w + rgba2.a * w2;
        
        return this.rgbaToHex({ r, g, b, a });
    }

    static random(alpha = 1) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return this.rgbaToHex({ r, g, b, a: alpha });
    }
}

export default ExsColourUtils;

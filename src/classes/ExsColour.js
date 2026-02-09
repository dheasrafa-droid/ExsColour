/**
 * Core Colour Class for Exs Engine
 * @module ExsColour
 * @requires ExsConstantsColour
 * @requires ExsColourUtils
 * @requires ExsColourAlgorithm
 * @author Exs Engine Development Team
 * @version 3.2.1
 * @license MIT
 */

import * as ExsConstants from '../core/ExsConstantsColour.js';
import ExsColourUtils from '../core/ExsColourUtils.js';
import { ExsColourAlgorithm } from '../core/ExsColourAlgorithm.js';

export class ExsColour {
    constructor(colourValue, format = null) {
        this._rawValue = colourValue;
        this._format = format;
        this._rgba = null;
        this._hsl = null;
        this._lab = null;
        this._parseColour(colourValue, format);
    }

    _parseColour(colourValue, format) {
        try {
            if (typeof colourValue === 'string') {
                this._rgba = ExsColourUtils.parseToRGBA(colourValue);
            } else if (colourValue && typeof colourValue === 'object') {
                if (colourValue.r !== undefined && colourValue.g !== undefined && colourValue.b !== undefined) {
                    this._rgba = { 
                        r: colourValue.r, 
                        g: colourValue.g, 
                        b: colourValue.b, 
                        a: colourValue.a !== undefined ? colourValue.a : 1 
                    };
                }
            }
            
            if (!this._rgba) throw new Error(`Invalid colour value: ${colourValue}`);
            if (!this._format) this._format = this._detectFormat(colourValue);
        } catch (error) {
            console.error(`ExsColour parsing error: ${error.message}`);
            this._rgba = { r: 0, g: 0, b: 0, a: 1 };
            this._format = ExsConstants.ExsColourFormat.HEX;
        }
    }

    _detectFormat(colourValue) {
        if (typeof colourValue === 'string') {
            if (ExsConstants.ExsValidation.REGEX.HEX.test(colourValue)) return ExsConstants.ExsColourFormat.HEX;
            if (ExsConstants.ExsValidation.REGEX.HEXA.test(colourValue)) return ExsConstants.ExsColourFormat.HEXA;
            if (ExsConstants.ExsValidation.REGEX.RGB.test(colourValue)) return ExsConstants.ExsColourFormat.RGB;
            if (ExsConstants.ExsValidation.REGEX.RGBA.test(colourValue)) return ExsConstants.ExsColourFormat.RGBA;
            if (ExsConstants.ExsValidation.REGEX.HSL.test(colourValue)) return ExsConstants.ExsColourFormat.HSL;
            if (ExsConstants.ExsValidation.REGEX.HSLA.test(colourValue)) return ExsConstants.ExsColourFormat.HSLA;
            if (ExsColourUtils.isNamedColour(colourValue)) return ExsConstants.ExsColourFormat.NAMED;
        }
        return ExsConstants.ExsDefaults.FORMAT;
    }

    get hsl() {
        if (!this._hsl) this._hsl = ExsColourUtils.rgbaToHSL(this._rgba);
        return { ...this._hsl };
    }

    get lab() {
        if (!this._lab) this._lab = ExsColourAlgorithm.ColourSpaceAlgorithm.rgbToLAB(this._rgba);
        return { ...this._lab };
    }

    get rgb() { return { r: this._rgba.r, g: this._rgba.g, b: this._rgba.b }; }
    get rgba() { return { ...this._rgba }; }
    get format() { return this._format; }
    get alpha() { return this._rgba.a; }

    set alpha(value) {
        this._rgba.a = ExsColourAlgorithm.clamp(value, 0, 1);
        this._invalidateCachedValues();
    }

    _invalidateCachedValues() {
        this._hsl = null;
        this._lab = null;
    }

    toHex(includeAlpha = false) {
        return ExsColourUtils.rgbaToHex(this._rgba, includeAlpha);
    }

    toRGB() {
        return `rgb(${Math.round(this._rgba.r)}, ${Math.round(this._rgba.g)}, ${Math.round(this._rgba.b)})`;
    }

    toRGBA() {
        return `rgba(${Math.round(this._rgba.r)}, ${Math.round(this._rgba.g)}, ${Math.round(this._rgba.b)}, ${this._rgba.a})`;
    }

    toHSL() {
        const hsl = this.hsl;
        return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    }

    toHSLA() {
        const hsl = this.hsl;
        return `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${this._rgba.a})`;
    }

    toString() {
        switch (this._format) {
            case ExsConstants.ExsColourFormat.HEX: return this.toHex();
            case ExsConstants.ExsColourFormat.HEXA: return this.toHex(true);
            case ExsConstants.ExsColourFormat.RGB: return this.toRGB();
            case ExsConstants.ExsColourFormat.RGBA: return this.toRGBA();
            case ExsConstants.ExsColourFormat.HSL: return this.toHSL();
            case ExsConstants.ExsColourFormat.HSLA: return this.toHSLA();
            default: return this.toHex();
        }
    }

    clone() {
        return new ExsColour(this.toString(), this._format);
    }

    darken(percentage) {
        const hex = ExsColourUtils.darken(this.toString(), percentage);
        return new ExsColour(hex, ExsConstants.ExsColourFormat.HEX);
    }

    lighten(percentage) {
        const hex = ExsColourUtils.lighten(this.toString(), percentage);
        return new ExsColour(hex, ExsConstants.ExsColourFormat.HEX);
    }

    saturate(percentage) {
        const hex = ExsColourUtils.saturate(this.toString(), percentage);
        return new ExsColour(hex, ExsConstants.ExsColourFormat.HEX);
    }

    complementary() {
        const hsl = this.hsl;
        const complementaryHue = (hsl.h + 180) % 360;
        return ExsColour.fromHSL(complementaryHue, hsl.s, hsl.l, this.alpha);
    }

    invert() {
        return new ExsColour(
            ExsColourUtils.rgbaToHex({
                r: 255 - this._rgba.r,
                g: 255 - this._rgba.g,
                b: 255 - this._rgba.b,
                a: this._rgba.a
            }),
            ExsConstants.ExsColourFormat.HEX
        );
    }

    grayscale() {
        const luminance = ExsColourUtils.calculateLuminance(this._rgba);
        const gray = Math.round(luminance * 255);
        return new ExsColour(
            ExsColourUtils.rgbaToHex({ r: gray, g: gray, b: gray, a: this._rgba.a }),
            ExsConstants.ExsColourFormat.HEX
        );
    }

    mix(otherColour, weight = 0.5) {
        const otherStr = otherColour instanceof ExsColour ? otherColour.toString() : otherColour;
        const hex = ExsColourUtils.mix(this.toString(), otherStr, weight);
        return new ExsColour(hex, ExsConstants.ExsColourFormat.HEX);
    }

    contrastRatio(otherColour) {
        const otherStr = otherColour instanceof ExsColour ? otherColour.toString() : otherColour;
        return ExsColourUtils.calculateContrastRatio(this.toString(), otherStr);
    }

    deltaE(otherColour, method = '76') {
        const other = otherColour instanceof ExsColour ? otherColour : new ExsColour(otherColour);
        return ExsColourAlgorithm.ColourSpaceAlgorithm.deltaE76(this.lab, other.lab);
    }

    toCMYK() {
        return ExsColourAlgorithm.ColourSpaceAlgorithm.rgbToCMYK(this._rgba);
    }

    get temperature() {
        return ExsColourAlgorithm.calculateColourTemperature(this._rgba);
    }

    toJSON() {
        return {
            value: this.toString(),
            format: this._format,
            rgba: this._rgba,
            hsl: this.hsl,
            temperature: this.temperature
        };
    }

    static fromJSON(json) {
        return new ExsColour(json.value, json.format);
    }

    static fromRGB(r, g, b, a = 1) {
        return new ExsColour(`rgba(${r}, ${g}, ${b}, ${a})`, ExsConstants.ExsColourFormat.RGBA);
    }

    static fromHSL(h, s, l, a = 1) {
        return new ExsColour(`hsla(${h}, ${s}%, ${l}%, ${a})`, ExsConstants.ExsColourFormat.HSLA);
    }

    static random(alpha = 1) {
        const hex = ExsColourUtils.random(alpha);
        return new ExsColour(hex, ExsConstants.ExsColourFormat.HEX);
    }
}

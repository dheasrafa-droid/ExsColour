import { ExsColour } from '../../src/classes/ExsColour.js';
import ExsColourSystem from '../../src/ExsColourSystem.js';

describe('ExsColour Class', () => {
    test('should create colour from hex', () => {
        const colour = new ExsColour('#FF0000');
        expect(colour.toHex()).toBe('#ff0000');
        expect(colour.rgb).toEqual({ r: 255, g: 0, b: 0 });
    });

    test('should create colour from rgb', () => {
        const colour = new ExsColour('rgb(255, 0, 0)');
        expect(colour.toHex()).toBe('#ff0000');
    });

    test('should create colour from hsl', () => {
        const colour = new ExsColour('hsl(0, 100%, 50%)');
        expect(colour.toHex()).toBe('#ff0000');
    });

    test('should darken colour', () => {
        const colour = new ExsColour('#FF0000');
        const darkened = colour.darken(20);
        expect(darkened.toHex()).toBe('#cc0000');
    });

    test('should lighten colour', () => {
        const colour = new ExsColour('#000000');
        const lightened = colour.lighten(50);
        expect(lightened.toHex()).toBe('#808080');
    });

    test('should mix colours', () => {
        const red = new ExsColour('#FF0000');
        const blue = new ExsColour('#0000FF');
        const mixed = red.mix(blue, 0.5);
        expect(mixed.toHex()).toBe('#800080');
    });

    test('should calculate contrast ratio', () => {
        const white = new ExsColour('#FFFFFF');
        const black = new ExsColour('#000000');
        const ratio = white.contrastRatio(black);
        expect(ratio).toBeGreaterThan(20);
    });

    test('should convert to different formats', () => {
        const colour = new ExsColour('#FF0000');
        expect(colour.toRGB()).toBe('rgb(255, 0, 0)');
        expect(colour.toRGBA()).toBe('rgba(255, 0, 0, 1)');
        expect(colour.toHSL()).toBe('hsl(0, 100%, 50%)');
    });

    test('should handle alpha transparency', () => {
        const colour = new ExsColour('rgba(255, 0, 0, 0.5)');
        expect(colour.alpha).toBe(0.5);
        colour.alpha = 0.8;
        expect(colour.alpha).toBe(0.8);
    });

    test('should create random colour', () => {
        const randomColour = ExsColour.random();
        expect(randomColour).toBeInstanceOf(ExsColour);
        expect(ExsColourSystem.isValidColour(randomColour.toString())).toBe(true);
    });
});

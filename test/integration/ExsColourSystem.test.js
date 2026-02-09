import ExsColourSystem from '../../src/ExsColourSystem.js';

describe('ExsColourSystem Integration', () => {
    test('should export all modules correctly', () => {
        expect(ExsColourSystem.ExsColour).toBeDefined();
        expect(ExsColourSystem.ExsColourPalette).toBeDefined();
        expect(ExsColourSystem.ExsColourGradient).toBeDefined();
        expect(ExsColourSystem.ExsColourScheme).toBeDefined();
        expect(ExsColourSystem.ExsColourManager).toBeDefined();
        expect(ExsColourSystem.ExsColourUtils).toBeDefined();
        expect(ExsColourSystem.ExsColourAlgorithm).toBeDefined();
        expect(ExsColourSystem.ExsConstants).toBeDefined();
    });

    test('should create colour using factory method', () => {
        const colour = ExsColourSystem.createColour('#FF0000');
        expect(colour.toHex()).toBe('#ff0000');
    });

    test('should create palette using factory method', () => {
        const palette = ExsColourSystem.createPalette(['#FF0000', '#00FF00'], 'test');
        expect(palette.length).toBe(2);
        expect(palette.name).toBe('test');
    });

    test('should create gradient using factory method', () => {
        const gradient = ExsColourSystem.createGradient([
            { colour: '#FF0000', position: 0 },
            { colour: '#0000FF', position: 1 }
        ]);
        expect(gradient.getColourAt(0.5).toHex()).toBe('#800080');
    });

    test('should create scheme using factory method', () => {
        const scheme = ExsColourSystem.createScheme({
            primary: '#1A73E8',
            background: '#FFFFFF'
        });
        expect(scheme.primary.toHex()).toBe('#1a73e8');
        expect(scheme.background.toHex()).toBe('#ffffff');
    });

    test('should create manager using factory method', () => {
        const manager = ExsColourSystem.createManager();
        expect(manager).toBeInstanceOf(ExsColourSystem.ExsColourManager);
    });

    test('should have quick access to constants', () => {
        expect(ExsColourSystem.colours.RED).toBe('#FF0000');
        expect(ExsColourSystem.themes.UI_PRIMARY).toBe('#1A73E8');
        expect(ExsColourSystem.material.RED[500]).toBe('#F44336');
    });

    test('should have helper functions', () => {
        expect(ExsColourSystem.isValidColour('#FF0000')).toBe(true);
        expect(ExsColourSystem.isValidColour('invalid')).toBe(false);
        
        const rgba = ExsColourSystem.parseColour('#FF0000');
        expect(rgba).toEqual({ r: 255, g: 0, b: 0, a: 1 });
        
        const contrast = ExsColourSystem.calculateContrast('#FFFFFF', '#000000');
        expect(contrast).toBeGreaterThan(20);
        
        const mixed = ExsColourSystem.mixColours('#FF0000', '#0000FF', 0.5);
        expect(mixed).toBe('#800080');
    });
});

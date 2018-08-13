import * as colors from '../colors';


describe('colorToANSI()', () => {
    it('has red', () => {
        expect(colors.colorToANSI('red')).toBe('31');
    })
    it('throws for unknown color', () => {
        expect(() => (colors.colorToANSI('unknown'))).toThrow();
    })
})

describe('String.prototype.toColor', () => {
    it('exists', () => {
        expect((<any>String.prototype).toColor).not.toBeUndefined()
    })
    it('colors text', () => {
        expect((<any>'text').toColor('red')).toBe('[31mtext[0m')
    })
})

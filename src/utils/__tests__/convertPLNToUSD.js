import { convertPLNToUSD } from './../convertPLNToUSD.js'

describe('ConvertPLNToUSD', () => {
    it('should return proper value when good input', () => {
        expect(convertPLNToUSD(1)).toBe('$0.29')
        expect(convertPLNToUSD(2)).toBe('$0.57')
        expect(convertPLNToUSD(20)).toBe('$5.71')
        expect(convertPLNToUSD(12)).toBe('$3.43')
    });
    it('should return NaN when input is text', () => {
        expect(convertPLNToUSD('6')).toBeNaN();
        expect(convertPLNToUSD('abc')).toBeNaN();
        expect(convertPLNToUSD('-543')).toBeNaN();
    });
    it('should return NaN when there is no imput', () => {
        expect(convertPLNToUSD()).toBeNaN();

    });
    it('should return "Error" when input is different than number and string', () => {
        expect(convertPLNToUSD({})).toBe('Error');
        expect(convertPLNToUSD([])).toBe('Error');
        expect(convertPLNToUSD(null)).toBe('Error');
        expect(convertPLNToUSD(function () { })).toBe('Error');
    });

    it('should return zero when input is lower than zero', () => {
        expect(convertPLNToUSD(-2)).toBe('$0.00');
        expect(convertPLNToUSD(-7)).toBe('$0.00');
        expect(convertPLNToUSD(-100)).toBe('$0.00');
    });
})
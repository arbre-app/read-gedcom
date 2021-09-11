import 'mocha';
import { expect } from 'chai';
import { parseDate } from '../src';


describe('Dates parsing', () => {

    const common = {
        hasDate: false,
        hasPhrase: false,
        isDatePunctual: false,
        isDatePeriod: false,
        isDateRange: false,
        isDateApproximated: false,
        isDateInterpreted: false,
    };

    const commonCalendar = {
        isGregorian: false,
        isJulian: false,
        isHebrew: false,
        isFrenchRepublican: false,
        isUnknown: false,
    };

    const commonYear = {
        isBce: false,
        isDual: false,
    };

    const commonApproximationKind = {
        isAbout: false,
        isCalculated: false,
        isEstimated: false,
    };

    it('should parse Gregorian dates accordingly', () => {
        const calendarGregorian = { ...commonCalendar, isGregorian: true };

        expect(parseDate('18 JUN 1940')).deep.equal({
            ...common,
            hasDate: true,
            isDatePunctual: true,
            date: {
                calendar: calendarGregorian,
                day: 18,
                month: 6,
                year: {
                    ...commonYear,
                    value: 1940,
                },
            },
        });

        expect(parseDate('AFT MAY 1968')).deep.equal({
            ...common,
            hasDate: true,
            isDateRange: true,
            dateAfter: {
                calendar: calendarGregorian,
                month: 5,
                year: {
                    ...commonYear,
                    value: 1968,
                },
            },
        });

        expect(parseDate('BET 1800 AND JAN 1850')).deep.equal({
            ...common,
            hasDate: true,
            isDateRange: true,
            dateAfter: {
                calendar: calendarGregorian,
                year: {
                    ...commonYear,
                    value: 1800,
                },
            },
            dateBefore: {
                calendar: calendarGregorian,
                month: 1,
                year: {
                    ...commonYear,
                    value: 1850,
                },
            },
        });

        expect(parseDate('ABT 27 MAR 1756')).deep.equal({
            ...common,
            hasDate: true,
            isDatePunctual: true,
            isDateApproximated: true,
            approximationKind: {
                ...commonApproximationKind,
                isAbout: true,
            },
            date: {
                calendar: calendarGregorian,
                day: 27,
                month: 3,
                year: {
                    ...commonYear,
                    value: 1756,
                },
            },
        });

        expect(parseDate('FROM @@#DGREGORIAN@@ 19 BCE TO @@#DGREGORIAN@@ 15 SEP 1951/52')).deep.equal({
            ...common,
            hasDate: true,
            isDatePeriod: true,
            dateFrom: {
                calendar: calendarGregorian,
                year: {
                    ...commonYear,
                    isBce: true,
                    value: 19,
                },
            },
            dateTo: {
                calendar: calendarGregorian,
                day: 15,
                month: 9,
                year: {
                    ...commonYear,
                    isDual: true,
                    value: 1951,
                    valueDual: 52,
                },
            }
        });

        expect(parseDate('INT DEC 1907 (this is a phrase)')).deep.equal({
            ...common,
            hasDate: true,
            hasPhrase: true,
            isDatePunctual: true,
            isDateInterpreted: true,
            date: {
                calendar: calendarGregorian,
                month: 12,
                year: {
                    ...commonYear,
                    value: 1907,
                },
            },
            phrase: 'this is a phrase',
        });

        expect(parseDate('( just a phrase )')).deep.equal({
            ...common,
            hasPhrase: true,
            phrase: ' just a phrase ',
        });
    });

    it('should reject malformed inputs', () => {
        const test = (malformed: string): unknown => expect(parseDate(malformed)).to.equal(null);
        test('');
        test('    ');
        test('x');
        test('?');
        test('-1');
        test('1900/1901');
        test('ABT1900');
        test('14 1900');
        test('BET 1900 TO 1901');
        test('BET 1900 AND ABT 1901');
        test('FROM 1900 TO');
        test('1900a');
        test('a1900');
        test('0 MAR 1900');
        test('JAN JAN 1900');
        test('@@#DGREGORIAN@@');
        test('@@#DGREGORIAN@@ @@#DGREGORIAN@@ 1900');
        test('1900 AND 1901');
        test('JAN');
        test('ABT');
        test('abt 1900');
        test('phrase');
        test('(phrase');
        test('phrase)');
        test('1900(a)');
    });

    it('should accept valid Gregorian calendar dates', () => {
        const test = (date: string): unknown => expect(parseDate(date)).to.not.equal(null);
        test('1 JAN 2000');

        test('31 JAN 2000');
        test('31 MAR 2000');
        test('31 MAY 2000');
        test('31 JUL 2000');
        test('31 AUG 2000');
        test('31 OCT 2000');
        test('31 DEC 2000');

        test('29 FEB 2020');
        test('29 FEB 2000');
    });

    it('should reject invalid Gregorian calendar dates', () => {
        const test = (date: string): unknown => expect(parseDate(date)).to.equal(null);
        test('0 JAN 2000');

        test('32 JAN 2000');
        test('31 APR 2000');
        test('31 JUN 2000');
        test('31 SEP 2000');
        test('31 NOV 2000');

        test('29 FEB 2021');
        test('29 FEB 1900');
    });

});

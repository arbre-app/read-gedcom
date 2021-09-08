import 'mocha';
import assert from 'assert';
import { GedcomDate, parseDate, toJsDate } from '../src';

describe('Parsed dates to JS dates conversion', () => {
    const testPunctual = (value: string, expected: string | Date): void => {
        const parsed = parseDate(value);
        assert(parsed !== null && parsed.isDatePunctual);
        const { date } = parsed as GedcomDate.Fuzzy.Punctual;
        assert.deepStrictEqual(toJsDate(date), new Date(expected));
    };

    it('should correctly convert Gregorian dates to JS dates', () => {
        testPunctual('21 FEB 2021', '2021-02-21');
        testPunctual('14 JUL 2000', '2000-07-14');
        testPunctual('11 NOV 1918', '1918-11-11');
        testPunctual('8 MAY 1945', '1945-05-08');
        testPunctual('29 NOV 1226', '1226-11-29')
        testPunctual('753 B.C.', new Date(Date.UTC(-753, 0, 1)));
    });

    it('should correctly convert French Republican dates to JS dates', () => {
        // Source: https://fr.wikipedia.org/wiki/Concordance_des_dates_des_calendriers_r%C3%A9publicain_et_gr%C3%A9gorien
        const fr = (date: string) => `@@#DFRENCH R@@ ${date}`;
        testPunctual(fr('4 VEND 2'), '1793-09-25');
        testPunctual(fr('16 VEND 5'), '1796-10-07');
        testPunctual(fr('6 VEND 4'), '1795-09-28');
        testPunctual(fr('3 COMP 6'), '1798-09-19');
        testPunctual(fr('6 COMP 7'), '1799-09-22');
        testPunctual(fr('9 THER 2'), '1794-07-27');
        testPunctual(fr('27 BRUM 5'), '1796-11-17');
        testPunctual(fr('26 PRAI 8'), '1800-06-15');
        testPunctual(fr('18 BRUM 8'), '1799-11-09');

        testPunctual(fr('12 FRIM 5'), '1796-12-02');
        testPunctual(fr('10 VENT 4'), '1796-02-29');
        testPunctual(fr('15 THER 6'), '1798-08-02');
        testPunctual(fr('11 FRIM 13'), '1804-12-02');
        testPunctual(fr('29 VEND 14'), '1805-10-21');
        testPunctual(fr('11 FRIM 14'), '1805-12-02');

        // Additional test cases
        testPunctual(fr('9 VENT 8'), '1800-02-28');
        testPunctual(fr('10 VENT 8'), '1800-03-01');
        testPunctual(fr('11 VENT 8'), '1800-03-02');
        testPunctual(fr('30 VENT 8'), '1800-03-21');
        testPunctual(fr('1 GERM 8'), '1800-03-22');
        testPunctual(fr('17 NIVO 8'), '1800-01-07');
        testPunctual(fr('4 PLUV 8'), '1800-01-24');
        testPunctual(fr('11 FLOR 8'), '1800-05-01');
        testPunctual(fr('25 MESS 8'), '1800-07-14');
        testPunctual(fr('29 FRUC 8'), '1800-09-16');
    });
});

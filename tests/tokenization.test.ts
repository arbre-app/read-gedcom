import { describe, it } from 'mocha';
import { assert, expect } from 'chai';
import { ErrorTokenization } from '../src';
import { tokenize } from '../src/parse/tokenizer';

describe('Gedcom tokenizer', () => {
    const sampleCorrectLines = [
        '0 @I1234@ INDI',
        '1 AGE 13y',
        '1 CHIL @I1234@',
        '1 NOTE This is a note field that is',
        '2 CONT continued on the next line.',
    ].map(l => l + '\n');

    it('should correctly match separate lines', () => {
        sampleCorrectLines.forEach(mockLine => {
            let first = true;
            for(const line of tokenize(mockLine)) { // eslint-disable-line
                assert(first, mockLine);
                first = false;
            }
            assert(!first, mockLine);
        });
    });

    it('should correctly match all lines', () => {
        let count = 0;
        for(const line of tokenize(sampleCorrectLines.join(''))) { // eslint-disable-line
            count++;
        }
        assert(count === sampleCorrectLines.length);
    });

    const sampleIncorrectLines = [
        '01 @I1234@ INDI', // level must not start with a 0
        ' 1 AGE 13y', // invalid start
        '1  AGE 13y', // invalid delimiter
        //'1 CHIL @@I1234@', // invalid at escaping
        //'1 CHIL @I1234@@', // same
        '1 MY-NOTE This is a note field that is', // invalid character in tag
        '2 CONT continued on the next line.\n\r', // illegal line ending
    ].map(l => l + '\n');

    it('should throw an error on incorrect separate lines', () => {
        sampleIncorrectLines.forEach(mockLine => {
            expect(() => {
                // eslint-disable-next-line
                for(const line of tokenize(mockLine)) { }
            }).to.throw(ErrorTokenization);
        });
    });
});

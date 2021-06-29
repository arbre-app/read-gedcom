import 'mocha';
import assert from 'assert';
import { tokenize } from '../src/parse/tokenizer';


describe('Gedcom tokenizer', () => {
    const sampleCorrectLines = [
        '0 @I1234@ INDI',
        '1 AGE 13y',
        '1 CHIL @I1234@',
        '1 NOTE This is a note field that is',
        '2 CONT continued on the next line.'
    ].map(l => l + '\n');

    it('should correctly match separate lines', () => {
        sampleCorrectLines.forEach(mockLine => {
            let first = true;
            for(let line of tokenize(mockLine)) {
                assert(first, mockLine);
                first = false;
            }
            assert(!first, mockLine);
        });
    });

    it('should correctly match all lines', () => {
        let count = 0;
        for(let line of tokenize(sampleCorrectLines.join(''))) {
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
        '2 CONT continued on the next line.\n\r' // illegal line ending
    ].map(l => l + '\n');

    it('should throw an error on incorrect separate lines', () => {
        sampleIncorrectLines.forEach(mockLine => {
            assert.throws(() => {
                for(let line of tokenize(mockLine)) { }
            }, Error, mockLine);
        })
    });
});

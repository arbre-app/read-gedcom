import { describe, it } from 'mocha';
import { assert } from 'chai';
import {ErrorInvalidFileType, ErrorTokenization, parseGedcom} from '../src';

describe('Gedcom file with and without trailing newlines', () => {
    const lines = [
        '0 HEAD',
        '1 GEDC',
        '2 VERS 5.5.5',
        '2 FORM LINEAGE-LINKED',
        '3 VERS 5.5.5',
        '1 CHAR UTF-8',
        '1 SOUR gedcom.org',
        '0 @U@ SUBM',
        '1 NAME gedcom.org',
        '0 TRLR',
    ];

    const read = (file: string) => {
        return parseGedcom(Buffer.from(file, 'utf8'));
    };

    it('should accept a file with a trailing newline', () => {
        read(lines.map(s => s + '\n').join(''));
    });

    it('should accept a file without a trailing newline', () => {
        read(lines.join('\n'));
    });

    it('should reject a file with two trailing newlines', () => {
        assert.throws(() => {
            read(lines.join('\n') + '\n\n');
        }, ErrorTokenization);
    });

    it('should reject a file with a trailing newline and a space', () => {
        assert.throws(() => {
            read(lines.join('\n') + '\n ');
        }, ErrorTokenization);
    });

    it('should reject a file with a newline in the middle', () => {
        assert.throws(() => {
            read([...lines.slice(0, 5), '', ...lines.slice(5)].map(s => s + '\n').join(''));
        }, ErrorTokenization);
    });

    it('should reject a file with a starting newline', () => {
        assert.throws(() => {
            read('\n' + lines.map(s => s + '\n').join(''));
        }, ErrorInvalidFileType);
    });

    it('should reject a file with a starting space', () => {
        assert.throws(() => {
            read(' ' + lines.map(s => s + '\n').join(''));
        }, ErrorInvalidFileType);
    });
});

import { describe, it } from 'mocha';
import { assert } from 'chai';
import { parseGedcom } from '../src';

describe('Gedcom header/trailer verification', () => {
    const header = [
        '0 HEAD',
        '1 GEDC',
        '2 VERS 5.5.5',
        '2 FORM LINEAGE-LINKED',
        '3 VERS 5.5.5',
        '1 CHAR UTF-8',
        '1 SOUR gedcom.org',
    ];
    const record = [
        '0 @U@ SUBM',
        '1 NAME gedcom.org',
    ];
    const trailer = [
        '0 TRLR',
    ];

    const read = (lines: string[]) => {
        return parseGedcom(Buffer.from(lines.map(s => s + '\n').join(''), 'utf8'));
    };

    it('should accept a correct minimal gedcom', () => {
        read([...header, ...record, ...trailer]);
    });

    it('should reject a file without a header', () => {
        assert.throws(function() {
            read([...record, ...trailer]);
        }); // TODO add error type
    });

    it('should reject a file without a trailer', () => {
        assert.throws(function() {
            read([...header, ...record]);
        }); // TODO
    });
});

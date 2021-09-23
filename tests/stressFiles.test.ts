import { describe, it } from 'mocha';
import { assert } from 'chai';
import fs from 'fs';
import { readGedcom } from '../src';

describe('Gedcom stress files', () => {
    // Source: http://www.geditcom.com/gedcom.html

    const filenames = ['TGC55C.ged', 'TGC55CLF.ged', 'TGC551.ged', 'TGC551LF.ged'];

    it('should read stress files without raising an exception', () => {
        filenames.forEach(filename => {
            const buffer = fs.readFileSync(`./tests/data/${filename}`);
            const result = readGedcom(buffer);
            assert(result.getHeader().getCopyright().value().some(s => s && s[0] === '\u00a9')); // Copyright symbol
        });
    });
});

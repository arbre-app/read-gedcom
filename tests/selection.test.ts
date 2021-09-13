import fs from 'fs';
import { describe, it } from 'mocha';
import { assert, expect } from 'chai';
import { Tag, readGedcom, SelectionGedcom, SelectionHeader } from '../src';

describe('Gedcom sample file', function () {
    const gedcom: SelectionGedcom = readGedcom(fs.readFileSync('./tests/data/sample555.ged'));

    it('should resolve links', () => {
        const families = gedcom
            .getIndividualRecord('@I1@') // ['@I1@']
            .getSpouseFamilyLink() // ['-> @F1@', '-> @F2@']
            .getFamilyRecord(); // ['@F1@', '@F2@']
        assert(families.length === 2);
    });

    it('should use the index correctly', () => {
        const wife = gedcom.getIndividualRecord().filter(node => node.pointer === '@I2@');
        expect(wife.pointer()).to.deep.equal(['@I2@']);
        const familyAsWife = wife.getFamilyAsSpouse();
        expect(familyAsWife.pointer()).to.deep.equal(['@F1@']);
        const child = familyAsWife.getChild().getIndividualRecord();
        expect(child.pointer()).to.deep.equal(['@I3@']);
        const familyAsChild = child.getFamilyAsChild();
        expect(familyAsChild.pointer()).to.deep.equal(['@F1@', '@F2@']);
    });

    it('should allow transtyping', () => {
        assert(gedcom.get(Tag.Header).as(SelectionHeader).getCharacterEncoding()[0].value === 'UTF-8');
    });
});

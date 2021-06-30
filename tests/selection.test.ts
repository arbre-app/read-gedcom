/* eslint-disable no-undef */
import fs from 'fs';
import 'mocha';
import assert from 'assert';
import { expect } from 'chai';
import { GedcomSelection, readGedcom } from '../src';

describe('Gedcom sample file', function () {
    const gedcom: GedcomSelection.Gedcom = readGedcom(fs.readFileSync('./tests/data/sample555.ged'));

    it('should ', () => {
        const families = gedcom
            .getIndividualRecord('@I1@') // ['@I1@']
            .getSpouseFamilyLink() // ['-> @F1@', '-> @F2@']
            .getFamilyRecord(); // ['@F1@', '@F2@']
        assert(families.length === 2);
    });

    it('should ', () => {
        const wife = gedcom.getIndividualRecord().filter(node => node.pointer === '@I2@');
        expect(wife.pointer()).to.deep.equal(['@I2@']);
        const familyAsWife = wife.getFamilyAsSpouse();
        expect(familyAsWife.pointer()).to.deep.equal(['@F1@']);
        const child = familyAsWife.getChild().getIndividualRecord();
        expect(child.pointer()).to.deep.equal(['@I3@']);
        const familyAsChild = child.getFamilyAsChild();
        expect(familyAsChild.pointer()).to.deep.equal(['@F1@', '@F2@']);
    });

    /*it('should allow transtyping', () => {
        assert(gedcom.get(GedcomTag.Header).as(GedcomSelection.Header).getCharacterEncoding()[0].value === 'UTF-8');
    });*/
});

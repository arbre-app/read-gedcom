import fs from 'fs';
import { before, describe, it } from 'mocha';
import { assert, expect } from 'chai';
import {
    readGedcom,
    ValueGedcomForm,
    ValueCharacterEncoding, ValueLanguage, ValueSex, SelectionGedcom, ValuePartDateDay,
} from '../src';

describe('Gedcom sample file', function () {
    const buffer = fs.readFileSync('./tests/data/sample555.ged');
    const gedcomWithIndex: SelectionGedcom = readGedcom(buffer);
    let gedcomWithoutIndex: SelectionGedcom = readGedcom(buffer, { noIndex: true });

    const testUsage = (gedcom: SelectionGedcom) => {
        const header = gedcom.getHeader();
        assert(header.length === 1);

        const gedcomFile = header.getGedcomFile();
        const version = gedcomFile.getVersion();
        assert(version.value()[0] === '5.5.5');
        expect(version.valueAsVersion()[0]).to.deep.equal([5, 5, 5]);

        const gedcomForm = gedcomFile.getGedcomForm();
        assert(gedcomForm.value()[0] === ValueGedcomForm.LineageLinked);
        assert(gedcomForm.getVersion().value()[0] === '5.5.5');

        assert(header.getCharacterEncoding().value()[0] === ValueCharacterEncoding.Utf8);

        const sourceSystem = header.getSourceSystem();
        assert(sourceSystem.value()[0] === 'GS');
        assert(sourceSystem.getName().value()[0] === 'GEDCOM Specification');
        assert(sourceSystem.getVersion().value()[0] === '5.5.5');

        const corporation = sourceSystem.getCorporation();
        assert(corporation.value()[0] === 'gedcom.org');
        assert(corporation.getAddress().getCity().value()[0] === 'LEIDEN');
        assert(corporation.getWebAddress().value()[0] === 'www.gedcom.org');

        const fileDate = header.getFileCreationDate();
        assert.deepStrictEqual(fileDate.valueAsExactDate()[0], { day: 2, month: 10, year: 2019 });
        assert.deepStrictEqual(fileDate.getExactTime().valueAsExactTime()[0], { hours: 0, minutes: 0, seconds: 0 });

        assert(header.getFilename().value()[0] === '555Sample.ged');
        assert(header.getLanguage().value()[0] === ValueLanguage.English);

        const submitter = header.getSubmitterReference().getSubmitterRecord();

        assert(submitter.pointer()[0] === '@U1@');
        assert(gedcom.getSubmitterRecord('@U1@').length === 1);
        assert(submitter.getName().value()[0] === 'Reldon Poulson');

        const ind1 = gedcom.getIndividualRecord('@I1@');
        assert(ind1.length === 1);
        assert.deepStrictEqual(ind1.getName().valueAsParts()[0], ['Robert Eugene', 'Williams', undefined]);
        assert(ind1.getSex().value()[0] === ValueSex.Male);
        const birth = ind1.getEventBirth();
        const birthDate = birth.getDate().valueAsDate()[0];
        assert(birthDate !== null && birthDate.isDatePunctual && !birthDate.isDateApproximated && !birthDate.isDateInterpreted);
        const withoutCalendar = <D extends ValuePartDateDay>(date: D): Omit<D, 'calendar'> => {
            const { calendar, ...rest } = date; // eslint-disable-line
            return rest;
        };
        assert.deepStrictEqual(withoutCalendar(birthDate.date as ValuePartDateDay), { day: 2, month: 10, year: { isBce: false, isDual: false, value: 1822 } });
        assert.deepStrictEqual(birth.getPlace().valueAsParts()[0], ['Weston', 'Madison', 'Connecticut', 'United States of America']);

        const fam1 = gedcom.getIndividualRecord('@I2@').getFamilyAsSpouse();
        assert(fam1.pointer()[0] === '@F1@');
    };

    it('should handle the full workflow correctly on an indexed file', () => testUsage(gedcomWithIndex));

    it('should handle the full workflow correctly on a file that is not indexed', () => testUsage(gedcomWithoutIndex));
});

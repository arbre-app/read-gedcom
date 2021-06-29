import fs from 'fs';
import 'mocha';
import assert from 'assert';
import { expect } from 'chai';
import {readGedcom, GedcomSelection, GedcomValue} from "../src";

describe('Gedcom sample file', function () {
    let gedcomWithIndex: GedcomSelection.Gedcom;
    let gedcomWithoutIndex: GedcomSelection.Gedcom;

    before(function (done) {
        fs.readFile('./tests/data/sample555.ged', (error, buffer) => {
            if (error) {
                throw error;
            }
            gedcomWithIndex = readGedcom(buffer);
            gedcomWithoutIndex = readGedcom(buffer, { noIndex: true });
            done();
        });
    });

    const testUsage = (gedcom: GedcomSelection.Gedcom) => {
        const header = gedcom.getHeader();
        assert(header.length === 1);

        const gedcomFile = header.getGedcomFile();
        const version = gedcomFile.getVersion();
        assert(version.value()[0] === '5.5.5');
        expect(version.valueAsVersion()[0]).to.deep.equal([5, 5, 5]);

        const gedcomForm = gedcomFile.getGedcomForm();
        assert(gedcomForm.value()[0] === GedcomValue.GedcomForm.LineageLinked);
        assert(gedcomForm.getVersion().value()[0] === '5.5.5');

        assert(header.getCharacterEncoding().value()[0] === GedcomValue.CharacterEncoding.Utf8);

        const sourceSystem = header.getSourceSystem()
        assert(sourceSystem.value()[0] === 'GS');
        assert(sourceSystem.getName().value()[0] === 'GEDCOM Specification');
        assert(sourceSystem.getVersion().value()[0] === '5.5.5');

        const corporation = sourceSystem.getCorporation();
        assert(corporation.value()[0] === 'gedcom.org');
        assert(corporation.getAddress().getCity().value()[0] === 'LEIDEN');
        assert(corporation.getWebAddress().value()[0] === 'www.gedcom.org');

        const fileDate = header.getFileCreationDate();
        assert(fileDate.value()[0] === '2 Oct 2019'); // TODO parse it
        assert(fileDate.getTime().value()[0] === '0:00:00'); // TODO

        assert(header.getFilename().value()[0] === '555Sample.ged');
        assert(header.getLanguage().value()[0] === 'English');

        const submitter = header.getSubmitterReference().getSubmitterRecord();

        assert(submitter.pointer()[0] === '@U1@');
        assert(gedcom.getSubmitterRecord('@U1@').length === 1);
        assert(submitter.getName().value()[0] === 'Reldon Poulson');
    };

    it('should handle the full workflow correctly on an indexed file', () => testUsage(gedcomWithIndex));

    it('should handle the full workflow correctly on a file that is not indexed', () => testUsage(gedcomWithoutIndex));
});

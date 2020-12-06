import fs from 'fs';
import 'mocha';
import assert from 'assert';
import { expect } from 'chai';
import { CharacterEncoding, GedcomForm, readGedcom } from '../src/index.js';

describe('Gedcom sample file', function () {
    /** @type {Gedcom} **/
    let gedcom = null;

    before(function (done) {
        fs.readFile('./test/data/sample555.ged', function(error, buffer) {
            if (error) {
                throw error;
            }
            gedcom = readGedcom(buffer);
            done();
        });
    });

    it('should handle the full workflow correctly', function () {
        const header = gedcom.getHeader();
        assert(header.count() === 1);

        const gedcomFile = header.getGedcomFile();
        const version = gedcomFile.getVersion();
        assert(version.value().one() === '5.5.5');
        expect(version.valueAsVersion().one()).deep.to.equal([5, 5, 5]);

        const gedcomForm = gedcomFile.getGedcomForm();
        assert(gedcomForm.value().one() === GedcomForm.LINEAGE_LINKED);
        assert(gedcomForm.getVersion().value().one() === '5.5.5');

        assert(header.getCharacterEncoding().value().one() === CharacterEncoding.UTF_8);

        const sourceSystem = header.getSourceSystem()
        assert(sourceSystem.value().one() === 'GS');
        assert(sourceSystem.getName().value().one() === 'GEDCOM Specification');
        assert(sourceSystem.getVersion().value().one() === '5.5.5');

        const corporation = sourceSystem.getCorporation();
        assert(corporation.value().one() === 'gedcom.org');
        assert(corporation.getAddress().getCity().value().one() === 'LEIDEN');
        assert(corporation.getWebAddress().value().one() === 'www.gedcom.org');

        const fileDate = header.getFileCreationDate();
        assert(fileDate.value().one() === '2 Oct 2019'); // TODO parse it
        assert(fileDate.getTime().value().one() === '0:00:00'); // TODO

        assert(header.getFilename().value().one() === '555Sample.ged');
        assert(header.getLanguage().value().one() === 'English');

        const submitter = header.getSubmitterReference().getSubmitterRecord();
        assert(submitter.pointer().one() === '@U1@');
        assert(!gedcom.getSubmitterRecord('@U1@').isEmpty())
        assert(submitter.getName().value().one() === 'Reldon Poulson');
    });
});

import { Node } from './Node';
import { GedcomFile } from './GedcomFile';
import { CharacterEncoding } from './CharacterEncoding';
import { Tag } from '../tag';
import { GedcomSource } from './GedcomSource';
import { DateExact } from './DateExact';
import { SubmitterReference } from './SubmitterReference';

export class Header extends Node {
    constructor(data) {
        super(data, Header);
    }

    getGedcomFile() {
        return this.getByTag(Tag.GEDCOM_FILE, GedcomFile);
    }

    getCharacterEncoding() {
        return this.getByTag(Tag.CHARACTER_ENCODING, CharacterEncoding);
    }

    getSource() {
        return this.getByTag(Tag.SOURCE, GedcomSource);
    }

    getDestinationSystem() {
        return this.getByTag(Tag.DESTINATION_SYSTEM)
    }

    getFileCreationDate() {
        return this.getByTag(Tag.DATE, DateExact);
    }

    getLanguage() {
        return this.getByTag(Tag.LANGUAGE);
    }

    getSubmitterReference() {
        return this.getByTag(Tag.SUBMITTER, SubmitterReference);
    }

    getFilename() {
        return this.getByTag(Tag.FILE_NAME);
    }

    getCopyright() {
        return this.getByTag(Tag.COPYRIGHT);
    }

    getNote() {
        return this.getByTag(Tag.NOTE);
    }
}

import { Node } from './Node';
import { GedcomFile } from './GedcomFile';
import { CharacterEncoding } from './CharacterEncoding';
import { Tag } from '../tag';
import { GedcomSource } from './GedcomSource';
import { DateExact } from './DateExact';
import { SubmitterReference } from './SubmitterReference';

export class Header extends Node {
    constructor(data, clazz) {
        super(data, clazz || Header);
    }

    getGedcomFile() {
        return this.get(Tag.GEDCOM, GedcomFile);
    }

    getCharacterEncoding() {
        return this.get(Tag.CHARACTER, CharacterEncoding);
    }

    getSourceSystem() {
        return this.get(Tag.SOURCE, GedcomSource);
    }

    getDestinationSystem() {
        return this.get(Tag.DESTINATION)
    }

    getFileCreationDate() {
        return this.get(Tag.DATE, DateExact);
    }

    getLanguage() {
        return this.get(Tag.LANGUAGE);
    }

    getSubmitterReference() {
        return this.get(Tag.SUBMITTER, SubmitterReference);
    }

    getFilename() {
        return this.get(Tag.FILE);
    }

    getCopyright() {
        return this.get(Tag.COPYRIGHT);
    }

    getNote() {
        return this.get(Tag.NOTE);
    }
}

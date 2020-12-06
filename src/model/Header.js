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

    getGedcomFile(q) {
        return this.get(Tag.GEDCOM, q, GedcomFile);
    }

    getCharacterEncoding(q) {
        return this.get(Tag.CHARACTER, q, CharacterEncoding);
    }

    getSourceSystem(q) {
        return this.get(Tag.SOURCE, q, GedcomSource);
    }

    getDestinationSystem(q) {
        return this.get(Tag.DESTINATION, q)
    }

    getFileCreationDate(q) {
        return this.get(Tag.DATE, q, DateExact);
    }

    getLanguage(q) {
        return this.get(Tag.LANGUAGE, q);
    }

    getSubmitterReference(q) {
        return this.get(Tag.SUBMITTER, q, SubmitterReference);
    }

    getFilename(q) {
        return this.get(Tag.FILE, q);
    }

    getCopyright(q) {
        return this.get(Tag.COPYRIGHT, q);
    }

    getNote(q) {
        return this.get(Tag.NOTE, q);
    }
}

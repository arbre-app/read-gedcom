import { Node } from './Node';
import { GedcomForm } from './GedcomForm';
import { GedcomVersion } from './GedcomVersion';
import { Tag } from '../parse';

export class GedcomFile extends Node {
    constructor(data) {
        super(data, GedcomFile);
    }

    getVersion() {
        return this.getByTag(Tag.VERSION_NUMBER, GedcomVersion);
    }

    getGedcomForm() {
        return this.getByTag(Tag.GEDCOM_FORM, GedcomForm);
    }
}

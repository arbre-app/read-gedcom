import { Node } from './Node';
import { GedcomForm } from './GedcomForm';
import { GedcomVersion } from './GedcomVersion';
import { Tag } from '../tag';

export class GedcomFile extends Node {
    constructor(data) {
        super(data, GedcomFile);
    }

    getVersion() {
        return this.getByTag(Tag.VERSION, GedcomVersion);
    }

    getGedcomForm() {
        return this.getByTag(Tag.FORMAT, GedcomForm);
    }
}

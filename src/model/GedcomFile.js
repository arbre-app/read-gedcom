import { Node } from './Node';
import { GedcomForm } from './GedcomForm';
import { GedcomVersion } from './GedcomVersion';
import { Tag } from '../tag';

export class GedcomFile extends Node {
    constructor(data, clazz) {
        super(data, clazz || GedcomFile);
    }

    getVersion(q) {
        return this.get(Tag.VERSION, q, GedcomVersion);
    }

    getGedcomForm(q) {
        return this.get(Tag.FORMAT, q, GedcomForm);
    }
}

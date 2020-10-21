import { Node } from './Node';
import { GedcomForm } from './GedcomForm';
import { GedcomVersion } from './GedcomVersion';
import { Tag } from '../tag';

export class GedcomFile extends Node {
    constructor(data, clazz) {
        super(data, clazz || GedcomFile);
    }

    getVersion() {
        return this.get(Tag.VERSION, GedcomVersion);
    }

    getGedcomForm() {
        return this.get(Tag.FORMAT, GedcomForm);
    }
}

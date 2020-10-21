import { Tag } from '../tag';
import { Node } from './Node';
import { NoteReferenceMixin } from './NoteReferenceMixin';

export class SpouseFamilyLink extends Node {
    constructor(data, clazz) {
        super(data, clazz || SpouseFamilyLink);
    }

    getFamilyRecord() {
        return this.getGedcom().getFamilyRecord(this.value());
    }

    getNote() {
        return this.get(Tag.NOTE, NoteReferenceMixin);
    }
}

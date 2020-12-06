import { Tag } from '../tag';
import { Node } from './Node';
import { NoteReferenceMixin } from './NoteReferenceMixin';

export class SpouseFamilyLink extends Node {
    constructor(data, clazz) {
        super(data, clazz || SpouseFamilyLink);
    }

    getFamilyRecord(q) {
        return this.getGedcom().getFamilyRecord(this.value().all(), q);
    }

    getNote(q) {
        return this.get(Tag.NOTE, q, NoteReferenceMixin);
    }
}

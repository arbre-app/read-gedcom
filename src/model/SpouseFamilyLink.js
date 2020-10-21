import { Tag } from '../tag';
import { FamilyRecord } from './FamilyRecord';
import { Node } from './Node';
import { NoteReferenceMixin } from './NoteReferenceMixin';

export class SpouseFamilyLink extends Node {
    constructor(data) {
        super(data, SpouseFamilyLink);
    }

    getFamilyRecord() {
        return this.getGedcom().getByTagPointers(Tag.FAMILY, this.array().map(o => o.value()), FamilyRecord);
    }

    getNote() {
        return this.getByTag(Tag.NOTE, NoteReferenceMixin);
    }
}

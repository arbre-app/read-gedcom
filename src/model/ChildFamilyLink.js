import { Tag } from '../tag';
import { Node } from './Node';
import { NoteReferenceMixin } from './NoteReferenceMixin';
import { PedigreeLinkageType } from './PedigreeLinkageType';

export class ChildFamilyLink extends Node {
    constructor(data, clazz) {
        super(data, clazz || ChildFamilyLink);
    }

    getFamilyRecord(q) {
        return this.getGedcom().getFamilyRecord(this.value().all(), q);
    }

    getPedigreeLinkageType(q) {
        return this.get(Tag.PEDIGREE, q, PedigreeLinkageType);
    }

    getNote(q) {
        return this.get(Tag.NOTE, q, NoteReferenceMixin);
    }
}

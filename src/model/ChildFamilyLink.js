import { Tag } from '../tag';
import { Node } from './Node';
import { NoteReferenceMixin } from './NoteReferenceMixin';
import { PedigreeLinkageType } from './PedigreeLinkageType';

export class ChildFamilyLink extends Node {
    constructor(data, clazz) {
        super(data, clazz || ChildFamilyLink);
    }

    getFamilyRecord() {
        return this.getGedcom().getFamilyRecord(this.value());
    }

    getPedigreeLinkageType() {
        return this.get(Tag.PEDIGREE, PedigreeLinkageType);
    }

    getNote() {
        return this.get(Tag.NOTE, NoteReferenceMixin);
    }
}

import { Tag } from '../tag';
import { FamilyRecord } from './FamilyRecord';
import { Node } from './Node';
import { NoteReferenceMixin } from './NoteReferenceMixin';
import { PedigreeLinkageType } from './PedigreeLinkageType';

export class ChildFamilyLink extends Node {
    constructor(data) {
        super(data, ChildFamilyLink);
    }

    getFamilyRecord() {
        return this.getGedcom().getByTagPointers(Tag.FAMILY, this.array().map(o => o.value()), FamilyRecord);
    }

    getPedigreeLinkageType() {
        return this.getByTag(Tag.PEDIGREE, PedigreeLinkageType);
    }

    getNote() {
        return this.getByTag(Tag.NOTE, NoteReferenceMixin);
    }
}

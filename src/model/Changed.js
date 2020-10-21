import { Tag } from '../tag';
import { Node } from './Node';
import { NoteReferenceMixin } from './NoteReferenceMixin';

export class Changed extends Node {
    constructor(data) {
        super(data, Changed);
    }

    // TODO: date exact

    getNote() {
        return this.getByTag(Tag.NOTE, NoteReferenceMixin);
    }
}

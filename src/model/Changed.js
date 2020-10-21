import { Tag } from '../tag';
import { Node } from './Node';
import { NoteReferenceMixin } from './NoteReferenceMixin';

export class Changed extends Node {
    constructor(data, clazz) {
        super(data, clazz || Changed);
    }

    // TODO: date exact

    getNote() {
        return this.get(Tag.NOTE, NoteReferenceMixin);
    }
}

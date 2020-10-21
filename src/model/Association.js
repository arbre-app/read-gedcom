import { Tag } from '../tag';
import { Node } from './Node';
import { NoteReferenceMixin } from './NoteReferenceMixin';
import { SourceReference } from './SourceReference';

export class Association extends Node {
    constructor(data) {
        super(data, Association);
    }

    getRelation() {
        return this.getByTag(Tag.RELATIONSHIP);
    }

    getSource() {
        return this.getByTag(Tag.SOURCE, SourceReference);
    }

    getNote() {
        return this.getByTag(Tag.NOTE, NoteReferenceMixin);
    }
}

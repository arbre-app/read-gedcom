import { Tag } from '../tag';
import { Node } from './Node';
import { NoteReferenceMixin } from './NoteReferenceMixin';
import { SourceCitation } from './SourceCitation';

export class Association extends Node {
    constructor(data, clazz) {
        super(data, clazz || Association);
    }

    getRelation() {
        return this.get(Tag.RELATIONSHIP);
    }

    getSourceCitation() {
        return this.get(Tag.SOURCE, SourceCitation);
    }

    getNote() {
        return this.get(Tag.NOTE, NoteReferenceMixin);
    }
}

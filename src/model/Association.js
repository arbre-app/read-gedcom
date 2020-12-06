import { Tag } from '../tag';
import { Node } from './Node';
import { NoteReferenceMixin } from './NoteReferenceMixin';
import { SourceCitation } from './SourceCitation';

export class Association extends Node {
    constructor(data, clazz) {
        super(data, clazz || Association);
    }

    getRelation(q) {
        return this.get(Tag.RELATIONSHIP, q);
    }

    getSourceCitation(q) {
        return this.get(Tag.SOURCE, q, SourceCitation);
    }

    getNote(q) {
        return this.get(Tag.NOTE, q, NoteReferenceMixin);
    }
}

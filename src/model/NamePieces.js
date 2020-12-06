import { Tag } from '../tag';
import { Node } from './Node';
import { NoteReferenceMixin } from './NoteReferenceMixin';
import { SourceCitation } from './SourceCitation';

export class NamePieces extends Node {
    constructor(data, clazz) {
        super(data, clazz || NamePieces);
    }

    getPrefixName(q) {
        return this.get(Tag.NAME_PREFIX, q);
    }

    getGivenName(q) {
        return this.get(Tag.GIVEN_NAME, q);
    }

    getNickname(q) {
        return this.get(Tag.NICKNAME, q);
    }

    getPrefixSurname(q) {
        return this.get(Tag.SURNAME_PREFIX, q);
    }

    getSurname(q) {
        return this.get(Tag.SURNAME, q);
    }

    getNameSuffix(q) {
        return this.get(Tag.NAME_SUFFIX, q);
    }

    getNote(q) {
        return this.get(Tag.NOTE, q, NoteReferenceMixin);
    }

    getSourceCitation(q) {
        return this.get(Tag.SOURCE, q, SourceCitation);
    }
}

import { Tag } from '../tag';
import { Node } from './Node';
import { NoteReferenceMixin } from './NoteReferenceMixin';
import { SourceCitation } from './SourceCitation';

export class NamePieces extends Node {
    constructor(data, clazz) {
        super(data, clazz || NamePieces);
    }

    getPrefixName() {
        return this.get(Tag.NAME_PREFIX);
    }

    getGivenName() {
        return this.get(Tag.GIVEN_NAME);
    }

    getNickname() {
        return this.get(Tag.NICKNAME);
    }

    getPrefixSurname() {
        return this.get(Tag.SURNAME_PREFIX);
    }

    getSurname() {
        return this.get(Tag.SURNAME);
    }

    getNameSuffix() {
        return this.get(Tag.NAME_SUFFIX);
    }

    getNote() {
        return this.get(Tag.NOTE, NoteReferenceMixin);
    }

    getSourceCitation() {
        return this.get(Tag.SOURCE, SourceCitation);
    }
}

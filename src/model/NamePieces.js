import { Tag } from '../tag';
import { Node } from './Node';
import { NoteReferenceMixin } from './NoteReferenceMixin';
import { SourceReference } from './SourceReference';

export class NamePieces extends Node {
    constructor(data) {
        super(data, NamePieces);
    }

    getPrefixName() {
        return this.getByTag(Tag.NAME_PREFIX);
    }

    getGivenName() {
        return this.getByTag(Tag.GIVEN_NAME);
    }

    getNickname() {
        return this.getByTag(Tag.NICKNAME);
    }

    getPrefixSurname() {
        return this.getByTag(Tag.SURNAME_PREFIX);
    }

    getSurname() {
        return this.getByTag(Tag.SURNAME);
    }

    getNameSuffix() {
        return this.getByTag(Tag.NAME_SUFFIX);
    }

    getNote() {
        return this.getByTag(Tag.NOTE, NoteReferenceMixin);
    }

    getSource() {
        return this.getByTag(Tag.SOURCE, SourceReference);
    }
}

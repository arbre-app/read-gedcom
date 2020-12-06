import { Tag } from '../tag';
import { MultimediaReference } from './MultimediaReference';
import { Node } from './Node';
import { NoteReferenceMixin } from './NoteReferenceMixin';
import { RepositoryReference } from './RepositoryReference';
import { SourceData } from './SourceData';

export class SourceRecord extends Node {
    constructor(data, clazz) {
        super(data, clazz || SourceRecord);
    }

    getData(q) {
        return this.get(Tag.DATA, q, SourceData);
    }

    getOriginator(q) {
        return this.get(Tag.AUTHOR, q);
    }

    getDescriptiveTitle(q) {
        return this.get(Tag.TITLE, q);
    }

    getShortTitle(q) {
        return this.get(Tag.ABBREVIATION, q);
    }

    getPublicationFacts(q) {
        return this.get(Tag.PUBLICATION, q);
    }

    getText(q) {
        return this.get(Tag.TEXT, q);
    }

    getRepository(q) {
        return this.get(Tag.REPOSITORY, q, RepositoryReference);
    }

    getNote(q) {
        return this.get(Tag.NOTE, q, NoteReferenceMixin);
    }

    getMultimedia(q) {
        return this.get(Tag.OBJECT, q, MultimediaReference);
    }
}

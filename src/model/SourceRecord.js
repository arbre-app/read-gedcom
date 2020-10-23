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

    getData() {
        return this.get(Tag.DATA, SourceData);
    }

    getOriginator() {
        return this.get(Tag.AUTHOR);
    }

    getDescriptiveTitle() {
        return this.get(Tag.TITLE);
    }

    getShortTitle() {
        return this.get(Tag.ABBREVIATION);
    }

    getPublicationFacts() {
        return this.get(Tag.PUBLICATION);
    }

    getText() {
        return this.get(Tag.TEXT);
    }

    getRepository() {
        return this.get(Tag.REPOSITORY, RepositoryReference);
    }

    getNote() {
        return this.get(Tag.NOTE, NoteReferenceMixin);
    }

    getMultimedia() {
        return this.get(Tag.OBJECT, MultimediaReference);
    }
}

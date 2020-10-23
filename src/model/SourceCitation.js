import { Tag } from '../tag';
import { CitationData } from './CitationData';
import { MultimediaReference } from './MultimediaReference';
import { Node } from './Node';
import { CitationEvent } from './CitationEvent';
import { NoteReferenceMixin } from './NoteReferenceMixin';
import { SourceCertainty } from './SourceCertainty';

export class SourceCitation extends Node {
    constructor(data, clazz) {
        super(data, clazz || SourceCitation);
    }

    getSourceRecord() {
        return this.getGedcom().getSourceRecord(this.value());
    }

    getLocationInSource() {
        return this.get(Tag.PAGE);
    }

    getEventCitedFrom() {
        return this.get(Tag.EVENT, CitationEvent);
    }

    getData() {
        return this.get(Tag.DATA, CitationData);
    }

    getMultimedia() {
        return this.get(Tag.OBJECT, MultimediaReference);
    }

    getNote() {
        return this.get(Tag.NOTE, NoteReferenceMixin);
    }

    getCertainty() {
        return this.get(Tag.QUALITY_OF_DATA, SourceCertainty);
    }
}

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

    getSourceRecord(q) {
        return this.getGedcom().getSourceRecord(this.value().all(), q);
    }

    getLocationInSource(q) {
        return this.get(Tag.PAGE, q);
    }

    getEventCitedFrom(q) {
        return this.get(Tag.EVENT, q, CitationEvent);
    }

    getData(q) {
        return this.get(Tag.DATA, q, CitationData);
    }

    getMultimedia(q) {
        return this.get(Tag.OBJECT, q, MultimediaReference);
    }

    getNote(q) {
        return this.get(Tag.NOTE, q, NoteReferenceMixin);
    }

    getCertainty(q) {
        return this.get(Tag.QUALITY_OF_DATA, q, SourceCertainty);
    }
}

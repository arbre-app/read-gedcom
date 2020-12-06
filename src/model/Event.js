import { AddressStructure } from './AddressStructure';
import { Date } from './Date';
import { Tag } from '../tag';
import { MultimediaReference } from './MultimediaReference';
import { NoteReferenceMixin } from './NoteReferenceMixin';
import { Place } from './Place';
import { SourceCitation } from './SourceCitation';

export class Event extends AddressStructure {
    static YES = 'Y';

    constructor(data, clazz) {
        super(data, clazz || Event);
    }

    valueAsHappened() {
        this.value().map(v => v ? (v === Event.YES ? true : null) : false);
    }

    getType(q) {
        return this.get(Tag.TYPE, q);
    }

    getDate(q) {
        return this.get(Tag.DATE, q, Date);
    }

    getPlace(q) {
        return this.get(Tag.PLACE, q, Place);
    }

    getResponsibleAgency(q) {
        return this.get(Tag.AGENCY, q);
    }

    getReligiousAffiliation(q) {
        return this.get(Tag.RELIGION, q);
    }

    getCause(q) {
        return this.get(Tag.CAUSE, q);
    }

    getNote(q) {
        return this.get(Tag.NOTE, q, NoteReferenceMixin);
    }

    getSourceCitation(q) {
        return this.get(Tag.SOURCE, q, SourceCitation);
    }

    getMultimedia(q) {
        return this.get(Tag.OBJECT, q, MultimediaReference);
    }
}

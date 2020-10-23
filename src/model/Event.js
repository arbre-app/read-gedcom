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
        this.valueMap(v => v ? (v === Event.YES ? true : null) : false);
    }

    getType() {
        return this.get(Tag.TYPE);
    }

    getDate() {
        return this.get(Tag.DATE, Date);
    }

    getPlace() {
        return this.get(Tag.PLACE, Place);
    }

    getResponsibleAgency() {
        return this.get(Tag.AGENCY);
    }

    getReligiousAffiliation() {
        return this.get(Tag.RELIGION);
    }

    getCause() {
        return this.get(Tag.CAUSE);
    }

    getNote() {
        return this.get(Tag.NOTE, NoteReferenceMixin);
    }

    getSourceCitation() {
        return this.get(Tag.SOURCE, SourceCitation);
    }

    getMultimedia() {
        return this.get(Tag.OBJECT, MultimediaReference);
    }
}

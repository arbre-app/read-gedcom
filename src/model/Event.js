import { AddressStructure } from './AddressStructure';
import { Date } from './Date';
import { Tag } from '../tag';
import { MultimediaReference } from './MultimediaReference';
import { NoteReferenceMixin } from './NoteReferenceMixin';
import { Place } from './Place';
import { SourceReference } from './SourceReference';

export class Event extends AddressStructure {
    constructor(data) {
        super(data, Event);
    }

    getType() {
        return this.getByTag(Tag.TYPE, undefined);
    }

    getDate() {
        return this.getByTag(Tag.DATE, Date);
    }

    getPlace() {
        return this.getByTag(Tag.PLACE, Place);
    }

    getResponsibleAgency() {
        return this.getByTag(Tag.AGENCY);
    }

    getReligiousAffiliation() {
        return this.getByTag(Tag.RELIGION);
    }

    getCause() {
        return this.getByTag(Tag.CAUSE);
    }

    getNote() {
        return this.getByTag(Tag.NOTE, NoteReferenceMixin);
    }

    getSource() {
        return this.getByTag(Tag.SOURCE, SourceReference);
    }

    getMultimedia() {
        return this.getByTag(Tag.OBJECT, MultimediaReference);
    }
}

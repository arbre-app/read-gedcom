import { Tag } from '../tag';
import { EventsRecorded } from './EventsRecorded';
import { Node } from './Node';
import { NoteReferenceMixin } from './NoteReferenceMixin';

export class SourceData extends Node {
    constructor(data, clazz) {
        super(data, clazz || SourceData);
    }

    getEventsRecorded(q) {
        return this.get(Tag.EVENT, q, EventsRecorded);
    }

    getResponsibleAgency(q) {
        return this.get(Tag.AGENCY, q);
    }

    getNote(q) {
        return this.get(Tag.NOTE, q, NoteReferenceMixin);
    }
}

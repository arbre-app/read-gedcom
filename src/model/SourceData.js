import { Tag } from '../tag';
import { EventsRecorded } from './EventsRecorded';
import { Node } from './Node';
import { NoteReferenceMixin } from './NoteReferenceMixin';

export class SourceData extends Node {
    constructor(data, clazz) {
        super(data, clazz || SourceData);
    }

    getEventsRecorded() {
        return this.get(Tag.EVENT, EventsRecorded);
    }

    getResponsibleAgency() {
        return this.get(Tag.AGENCY);
    }

    getNote() {
        return this.get(Tag.NOTE, NoteReferenceMixin);
    }
}

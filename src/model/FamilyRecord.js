import { FamilyEvent } from './FamilyEvent';
import { IndividualReference } from './IndividualReference';
import { Node } from './Node';
import { Tag } from '../tag';
import { NoteReferenceMixin } from './NoteReferenceMixin';

export class FamilyRecord extends Node {
    constructor(data) {
        super(data, FamilyRecord);
    }

    getEventByTag(tag) {
        return this.getByTag(tag, FamilyEvent);
    }

    getEventMarriage() {
        return this.getEventByTag(Tag.MARRIAGE, FamilyEvent);
    }

    getEventDivorce() {
        return this.getEventByTag(Tag.DIVORCE, FamilyEvent);
    }

    getEventDivorceFiled() {
        return this.getEventByTag(Tag.DIVORCE_FILED, FamilyEvent);
    }

    getEventAnnulment() {
        return this.getEventByTag(Tag.ANNULMENT, FamilyEvent);
    }

    // TODO

    getHusband() {
        return this.getByTag(Tag.HUSBAND, IndividualReference);
    }

    getWife() {
        return this.getByTag(Tag.WIFE, IndividualReference);
    }

    getChild() {
        return this.getByTag(Tag.CHILD, IndividualReference);
    }


    getNote() {
        return this.getByTag(Tag.NOTE, NoteReferenceMixin)
    }
}

import { FamilyEvent } from './FamilyEvent';
import { IndividualReference } from './IndividualReference';
import { Node } from './Node';
import { Tag } from '../tag';
import { NoteReference } from './NoteReference';

export class FamilyRecord extends Node {
    constructor(data) {
        super(data, FamilyRecord);
    }

    getEventByTag(tag) {
        return this.getByTag(tag, FamilyEvent);
    }

    getEventAnnulment() {
        return this.getEventByTag(Tag.ANNULMENT);
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
        return this.getByTag(Tag.NOTE, NoteReference)
    }
}

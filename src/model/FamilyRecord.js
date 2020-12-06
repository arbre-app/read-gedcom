import { FamilyEvent } from './FamilyEvent';
import { IndividualReference } from './IndividualReference';
import { Tag } from '../tag';
import { MultimediaReference } from './MultimediaReference';
import { NoteReferenceMixin } from './NoteReferenceMixin';
import { Record } from './Record';
import { SourceCitation } from './SourceCitation';

export class FamilyRecord extends Record {
    constructor(data, clazz) {
        super(data, clazz || FamilyRecord);
    }

    /* Events */

    getEventAnnulment(q) {
        return this.get(Tag.ANNULMENT, q, FamilyEvent);
    }

    getEventCensus(q) {
        return this.get(Tag.CENSUS, q, FamilyEvent);
    }

    getEventDivorce(q) {
        return this.get(Tag.DIVORCE, q, FamilyEvent);
    }

    getEventDivorceFiled(q) {
        return this.get(Tag.DIVORCE_FILED, q, FamilyEvent);
    }

    getEventEngagement(q) {
        return this.get(Tag.ENGAGEMENT, q, FamilyEvent);
    }

    getEventMarriageBann(q) {
        return this.get(Tag.MARRIAGE_BANN, q, FamilyEvent);
    }

    getEventMarriageContract(q) {
        return this.get(Tag.MARRIAGE_CONTRACT, q, FamilyEvent);
    }

    getEventMarriage(q) {
        return this.get(Tag.MARRIAGE, q, FamilyEvent);
    }

    getEventMarriageLicense(q) {
        return this.get(Tag.MARRIAGE_LICENSE, q, FamilyEvent);
    }

    getEventMarriageSettlement(q) {
        return this.get(Tag.MARRIAGE_SETTLEMENT, q, FamilyEvent);
    }

    getEventResidence(q) {
        return this.get(Tag.RESIDENCE, q, FamilyEvent); // Residence is normally an attribute
    }

    getEventOther(q) {
        return this.get(Tag.EVENT, q, FamilyEvent);
    }

    /* End events */

    getHusband(q) {
        return this.get(Tag.HUSBAND, q, IndividualReference);
    }

    getWife(q) {
        return this.get(Tag.WIFE, q, IndividualReference);
    }

    getChild(q) {
        return this.get(Tag.CHILD, q, IndividualReference);
    }

    getChildrenCount(q) {
        return this.get(Tag.CHILDREN_COUNT, q);
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

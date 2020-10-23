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

    getEventAnnulment() {
        return this.get(Tag.ANNULMENT, FamilyEvent);
    }

    getEventCensus() {
        return this.get(Tag.CENSUS, FamilyEvent);
    }

    getEventDivorce() {
        return this.get(Tag.DIVORCE, FamilyEvent);
    }

    getEventDivorceFiled() {
        return this.get(Tag.DIVORCE_FILED, FamilyEvent);
    }

    getEventEngagement() {
        return this.get(Tag.ENGAGEMENT, FamilyEvent);
    }

    getEventMarriageBann() {
        return this.get(Tag.MARRIAGE_BANN, FamilyEvent);
    }

    getEventMarriageContract() {
        return this.get(Tag.MARRIAGE_CONTRACT, FamilyEvent);
    }

    getEventMarriage() {
        return this.get(Tag.MARRIAGE, FamilyEvent);
    }

    getEventMarriageLicense() {
        return this.get(Tag.MARRIAGE_LICENSE, FamilyEvent);
    }

    getEventMarriageSettlement() {
        return this.get(Tag.MARRIAGE_SETTLEMENT, FamilyEvent);
    }

    getEventResidence() {
        return this.get(Tag.RESIDENCE, FamilyEvent); // Residence is normally an attribute
    }

    getEventOther() {
        return this.get(Tag.EVENT, FamilyEvent);
    }

    /* End events */

    getHusband() {
        return this.get(Tag.HUSBAND, IndividualReference);
    }

    getWife() {
        return this.get(Tag.WIFE, IndividualReference);
    }

    getChild() {
        return this.get(Tag.CHILD, IndividualReference);
    }

    getChildrenCount() {
        return this.get(Tag.CHILDREN_COUNT);
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

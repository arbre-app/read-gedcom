import { SelectionWithNoteSourceCitationMixin } from './mixin';
import { SelectionIndividualReference, SelectionMultimediaReference, SelectionFamilyEvent } from './internal';

import { Tag } from '../tag';
import { SelectionRecord } from './base';

export class SelectionFamilyRecord extends SelectionWithNoteSourceCitationMixin(SelectionRecord) {
    /* Events */

    getEventAnnulment() {
        return this.get(Tag.Annulment, null, SelectionFamilyEvent);
    }

    getEventCensus() {
        return this.get(Tag.Census, null, SelectionFamilyEvent);
    }

    getEventDivorce() {
        return this.get(Tag.Divorce, null, SelectionFamilyEvent);
    }

    getEventDivorceFiled() {
        return this.get(Tag.DivorceFiled, null, SelectionFamilyEvent);
    }

    getEventEngagement() {
        return this.get(Tag.Engagement, null, SelectionFamilyEvent);
    }

    getEventMarriageBann() {
        return this.get(Tag.MarriageBan, null, SelectionFamilyEvent);
    }

    getEventMarriageContract() {
        return this.get(Tag.MarriageContract, null, SelectionFamilyEvent);
    }

    getEventMarriage() {
        return this.get(Tag.Marriage, null, SelectionFamilyEvent);
    }

    getEventMarriageLicense() {
        return this.get(Tag.MarriageLicense, null, SelectionFamilyEvent);
    }

    getEventMarriageSettlement() {
        return this.get(Tag.MarriageSettlement, null, SelectionFamilyEvent);
    }

    getEventResidence() {
        return this.get(Tag.Residence, null, SelectionFamilyEvent); // Residence is normally an attribute
    }

    getEventOther() {
        return this.get(Tag.Event, null, SelectionFamilyEvent);
    }

    /* End events */

    getHusband() {
        return this.get(Tag.Husband, null, SelectionIndividualReference);
    }

    getWife() {
        return this.get(Tag.Wife, null, SelectionIndividualReference);
    }

    getChild() {
        return this.get(Tag.Child, null, SelectionIndividualReference);
    }

    getChildrenCount() {
        return this.get(Tag.ChildrenCount);
    }

    getMultimedia() {
        return this.get(Tag.Object, null, SelectionMultimediaReference);
    }
}

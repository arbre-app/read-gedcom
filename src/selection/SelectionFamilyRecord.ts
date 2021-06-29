import { SelectionIndividualReference } from './SelectionIndividualReference';
import { SelectionSourceCitation } from './SelectionSourceCitation';
import { SelectionMultimediaReference } from './SelectionMultimediaReference';
import { GedcomTag } from '../tag';
import { SelectionRecord } from './SelectionRecord';
import { SelectionFamilyEvent } from './SelectionFamilyEvent';
import { SelectionWithNoteMixin } from './mixin';

export class SelectionFamilyRecord extends SelectionWithNoteMixin(SelectionRecord) {
    /* Events */

    getEventAnnulment() {
        return this.get(GedcomTag.Annulment, null, SelectionFamilyEvent);
    }

    getEventCensus() {
        return this.get(GedcomTag.Census, null, SelectionFamilyEvent);
    }

    getEventDivorce() {
        return this.get(GedcomTag.Divorce, null, SelectionFamilyEvent);
    }

    getEventDivorceFiled() {
        return this.get(GedcomTag.DivorceFiled, null, SelectionFamilyEvent);
    }

    getEventEngagement() {
        return this.get(GedcomTag.Engagement, null, SelectionFamilyEvent);
    }

    getEventMarriageBann() {
        return this.get(GedcomTag.MarriageBan, null, SelectionFamilyEvent);
    }

    getEventMarriageContract() {
        return this.get(GedcomTag.MarriageContract, null, SelectionFamilyEvent);
    }

    getEventMarriage() {
        return this.get(GedcomTag.Marriage, null, SelectionFamilyEvent);
    }

    getEventMarriageLicense() {
        return this.get(GedcomTag.MarriageLicense, null, SelectionFamilyEvent);
    }

    getEventMarriageSettlement() {
        return this.get(GedcomTag.MarriageSettlement, null, SelectionFamilyEvent);
    }

    getEventResidence() {
        return this.get(GedcomTag.Residence, null, SelectionFamilyEvent); // Residence is normally an attribute
    }

    getEventOther() {
        return this.get(GedcomTag.Event, null, SelectionFamilyEvent);
    }

    /* End events */

    getHusband() {
        return this.get(GedcomTag.Husband, null, SelectionIndividualReference);
    }

    getWife() {
        return this.get(GedcomTag.Wife, null, SelectionIndividualReference);
    }

    getChild() {
        return this.get(GedcomTag.Child, null, SelectionIndividualReference);
    }

    getChildrenCount() {
        return this.get(GedcomTag.ChildrenCount);
    }

    getSourceCitation() {
        return this.get(GedcomTag.Source, null, SelectionSourceCitation);
    }

    getMultimedia() {
        return this.get(GedcomTag.Object, null, SelectionMultimediaReference);
    }
}

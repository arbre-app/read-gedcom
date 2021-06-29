import { SelectionName } from './SelectionName';
import { SelectionSex } from './SelectionSex';
import { SelectionIndividualEventFamily } from './SelectionIndividualEventFamily';
import { SelectionIndividualEventFamilyAdoption } from './SelectionIndividualEventFamilyAdoption';
import { SelectionIndividualEvent } from './SelectionIndividualEvent';
import { SelectionIndividualAttribute } from './SelectionIndividualAttribute';
import { SelectionChildFamilyLink } from './SelectionChildFamilyLink';
import { SelectionSpouseFamilyLink } from './SelectionSpouseFamilyLink';
import { SelectionAssociation } from './SelectionAssociation';
import { SelectionSourceCitation } from './SelectionSourceCitation';
import { SelectionMultimediaReference } from './SelectionMultimediaReference';
import { GedcomTag } from '../tag';
import {SelectionRecord} from "./SelectionRecord";
import {SelectionWithNoteMixin} from "./mixin";

/**
 * An individual record.
 * <table>
 *  <tr><th>Pointer</th><td>Yes</td></tr>
 *  <tr><th>Value</th><td>No</td></tr>
 * </table>
 */
export class SelectionIndividualRecord extends SelectionWithNoteMixin(SelectionRecord) {
    
    getName() {
        return this.get(GedcomTag.Name, null, SelectionName);
    }

    getSex() {
        return this.get(GedcomTag.Sex, null, SelectionSex);
    }

    getFamilyAsChild() {
        throw new Error('Not implemented');
    }

    getFamilyAsSpouse() {
        throw new Error('Not implemented');
    }

    /* Events */

    getEventBirth() {
        return this.get(GedcomTag.Birth, null, SelectionIndividualEventFamily);
    }

    getEventChristening() {
        return this.get(GedcomTag.Christening, null, SelectionIndividualEventFamily);
    }

    getEventDeath() {
        return this.get(GedcomTag.Death, null, SelectionIndividualEvent);
    }

    getEventBurial() {
        return this.get(GedcomTag.Burial, null, SelectionIndividualEvent);
    }

    getEventCremation() {
        return this.get(GedcomTag.Cremation, null, SelectionIndividualEvent);
    }

    getEventAdoption() {
        return this.get(GedcomTag.Adoption, null, SelectionIndividualEventFamilyAdoption);
    }

    getEventBaptism() {
        return this.get(GedcomTag.Baptism, null, SelectionIndividualEvent);
    }

    getEventBarMitzvah() {
        return this.get(GedcomTag.BarMitzvah, null, SelectionIndividualEvent);
    }

    getEventBatMitzvah() {
        return this.get(GedcomTag.BatMitzvah, null, SelectionIndividualEvent);
    }

    getEventAdultChristening() {
        return this.get(GedcomTag.AdultChristening, null, SelectionIndividualEvent);
    }

    getEventConfirmation() {
        return this.get(GedcomTag.Confirmation, null, SelectionIndividualEvent);
    }

    getEventFirstCommunion() {
        return this.get(GedcomTag.FirstCommunion, null, SelectionIndividualEvent);
    }

    getEventNaturalization() {
        return this.get(GedcomTag.Naturalization, null, SelectionIndividualEvent);
    }

    getEventEmigration() {
        return this.get(GedcomTag.Emigration, null, SelectionIndividualEvent);
    }

    getEventImmigration() {
        return this.get(GedcomTag.Immigration, null, SelectionIndividualEvent);
    }

    getEventCensus() {
        return this.get(GedcomTag.Census, null, SelectionIndividualEvent);
    }

    getEventProbate() {
        return this.get(GedcomTag.Probate, null, SelectionIndividualEvent);
    }

    getEventWill() {
        return this.get(GedcomTag.Will, null, SelectionIndividualEvent);
    }

    getEventGraduation() {
        return this.get(GedcomTag.Graduation, null, SelectionIndividualEvent);
    }

    getEventRetirement() {
        return this.get(GedcomTag.Retirement, null, SelectionIndividualEvent);
    }

    getEventOther() {
        return this.get(GedcomTag.Event, null, SelectionIndividualEvent);
    }

    /* End events */

    /* Attributes */

    getAttributeCaste() {
        return this.get(GedcomTag.Caste, null, SelectionIndividualAttribute);
    }

    getAttributePhysicalDescription() {
        return this.get(GedcomTag.PhysicalDescription, null, SelectionIndividualAttribute);
    }

    getAttributeScholasticAchievement() {
        return this.get(GedcomTag.Education, null, SelectionIndividualAttribute);
    }

    getAttributeIdentificationNumber() {
        return this.get(GedcomTag.IdentificationNumber, null, SelectionIndividualAttribute);
    }

    getAttributeNationality() {
        return this.get(GedcomTag.Nationality, null, SelectionIndividualAttribute);
    }

    getAttributeChildrenCount() {
        return this.get(GedcomTag.ChildrenCount, null, SelectionIndividualAttribute);
    }

    getAttributeRelationshipCount() {
        return this.get(GedcomTag.MarriageCount, null, SelectionIndividualAttribute);
    }

    getAttributeOccupation() {
        return this.get(GedcomTag.Occupation, null, SelectionIndividualAttribute);
    }

    getAttributePossessions() {
        return this.get(GedcomTag.Property, null, SelectionIndividualAttribute);
    }

    getAttributeReligiousAffiliation() {
        return this.get(GedcomTag.Religion, null, SelectionIndividualAttribute);
    }

    getAttributeResidence() {
        return this.get(GedcomTag.Residence, null, SelectionIndividualAttribute);
    }

    getAttributeNobilityTitle() {
        return this.get(GedcomTag.Title, null, SelectionIndividualAttribute);
    }

    getAttributeFact() {
        return this.get(GedcomTag.Fact, null, SelectionIndividualAttribute);
    }

    /* End attributes */

    getChildFamilyLink() {
        return this.get(GedcomTag.FamilyChild, null, SelectionChildFamilyLink);
    }

    getSpouseFamilyLink() {
        return this.get(GedcomTag.FamilySpouse, null, SelectionSpouseFamilyLink);
    }

    getAssociation() {
        return this.get(GedcomTag.Associates, null, SelectionAssociation);
    }

    getSourceCitation() {
        return this.get(GedcomTag.Source, null, SelectionSourceCitation);
    }

    getMultimedia() {
        return this.get(GedcomTag.Object, null, SelectionMultimediaReference);
    }
}

import { _get } from '../utils';
import { Association } from './Association';
import { ChildFamilyLink } from './ChildFamilyLink';
import { FamilyRecord } from './FamilyRecord';
import { IndividualAttribute } from './IndividualAttribute';
import { IndividualEventFamily } from './IndividualEventFamily';
import { IndividualEventFamilyAdoption } from './IndividualEventFamilyAdoption';
import { MultimediaReference } from './MultimediaReference';
import { Name } from './Name';
import { Tag } from '../tag';
import { NoteReferenceMixin } from './NoteReferenceMixin';
import { Record } from './Record';
import { Sex } from './Sex';
import { IndividualEvent } from './IndividualEvent';
import { SourceCitation } from './SourceCitation';
import { SpouseFamilyLink } from './SpouseFamilyLink';

export class IndividualRecord extends Record {
    constructor(data, clazz) {
        super(data, clazz || clazz || IndividualRecord);
    }

    getName(q) {
        return this.get(Tag.NAME, q, Name);
    }

    getSex(q) {
        return this.get(Tag.SEX, q, Sex);
    }

    getFamilyAsChild(q) {
        // TODO q (and method below)
        const rootData = this._data.root._data;
        const tree = this._data.tree;
        const arrayChildren = [], arrayParents = [];
        tree.forEach((t, i) => {
            const families = rootData.as_child[t.pointer];
            if (families !== undefined) {
                families.forEach(family => {
                    arrayChildren.push(family);
                    arrayParents.push(i);
                });
            }
        });
        return this._newInstance(FamilyRecord, arrayChildren, arrayParents, this);
    }

    getFamilyAsSpouse(q) {
        // TODO
        const rootData = this._data.root._data;
        const tree = this._data.tree;
        const arrayChildren = [], arrayParents = [];
        tree.forEach((t, i) => {
            const families = _get(rootData.as_spouse, t.pointer, []);
            families.forEach(family => {
                arrayChildren.push(family);
                arrayParents.push(i);
            });
        });
        return this._newInstance(FamilyRecord, arrayChildren, arrayParents, this);
    }

    /* Events */

    getEventBirth(q) {
        return this.get(Tag.BIRTH, q, IndividualEventFamily);
    }

    getEventChristening(q) {
        return this.get(Tag.CHRISTENING, q, IndividualEventFamily);
    }

    getEventDeath(q) {
        return this.get(Tag.DEATH, q, IndividualEvent);
    }

    getEventBurial(q) {
        return this.get(Tag.BURIAL, q, IndividualEvent);
    }

    getEventCremation(q) {
        return this.get(Tag.CREMATION, q, IndividualEvent);
    }

    getEventAdoption(q) {
        return this.get(Tag.ADOPTION, q, IndividualEventFamilyAdoption);
    }

    getEventBaptism(q) {
        return this.get(Tag.BAPTISM, q, IndividualEvent);
    }

    getEventBarMitzvah(q) {
        return this.get(Tag.BAR_MITZVAH, q, IndividualEvent);
    }

    getEventBatMitzvah(q) {
        return this.get(Tag.BAT_MITZVAH, q, IndividualEvent);
    }

    getEventAdultChristening(q) {
        return this.get(Tag.ADULT_CHRISTENING, q, IndividualEvent);
    }

    getEventConfirmation(q) {
        return this.get(Tag.CONFIRMATION, q, IndividualEvent);
    }

    getEventFirstCommunion(q) {
        return this.get(Tag.FIRST_COMMUNION, q, IndividualEvent);
    }

    getEventNaturalization(q) {
        return this.get(Tag.NATURALIZATION, q, IndividualEvent);
    }

    getEventEmigration(q) {
        return this.get(Tag.EMIGRATION, q, IndividualEvent);
    }

    getEventImmigration(q) {
        return this.get(Tag.IMMIGRATION, q, IndividualEvent);
    }

    getEventCensus(q) {
        return this.get(Tag.CENSUS, q, IndividualEvent);
    }

    getEventProbate(q) {
        return this.get(Tag.PROBATE, q, IndividualEvent);
    }

    getEventWill(q) {
        return this.get(Tag.WILL, q, IndividualEvent);
    }

    getEventGraduation(q) {
        return this.get(Tag.GRADUATION, q, IndividualEvent);
    }

    getEventRetirement(q) {
        return this.get(Tag.RETIREMENT, q, IndividualEvent);
    }

    getEventOther(q) {
        return this.get(Tag.EVENT, q, IndividualEvent);
    }

    /* End events */

    /* Attributes */

    getAttributeCaste(q) {
        return this.get(Tag.CASTE, q, IndividualAttribute);
    }

    getAttributePhysicalDescription(q) {
        return this.get(Tag.PHYSICAL_DESCRIPTION, q, IndividualAttribute);
    }

    getAttributeScholasticAchievement(q) {
        return this.get(Tag.EDUCATION, q, IndividualAttribute);
    }

    getAttributeIdentificationNumber(q) {
        return this.get(Tag.IDENTIFICATION_NUMBER, q, IndividualAttribute);
    }

    getAttributeNationality(q) {
        return this.get(Tag.NATIONALITY, q, IndividualAttribute);
    }

    getAttributeChildrenCount(q) {
        return this.get(Tag.CHILDREN_COUNT, q, IndividualAttribute);
    }

    getAttributeRelationshipCount(q) {
        return this.get(Tag.MARRIAGE_COUNT, q, IndividualAttribute);
    }

    getAttributeOccupation(q) {
        return this.get(Tag.OCCUPATION, q, IndividualAttribute);
    }

    getAttributePossessions(q) {
        return this.get(Tag.PROPERTY, q, IndividualAttribute);
    }

    getAttributeReligiousAffiliation(q) {
        return this.get(Tag.RELIGION, q, IndividualAttribute);
    }

    getAttributeResidence(q) {
        return this.get(Tag.RESIDENCE, q, IndividualAttribute);
    }

    getAttributeNobilityTitle(q) {
        return this.get(Tag.TITLE, q, IndividualAttribute);
    }

    getAttributeFact(q) {
        return this.get(Tag.FACT, q, IndividualAttribute);
    }

    /* End attributes */

    getChildFamilyLink(q) {
        return this.get(Tag.FAMILY_CHILD, q, ChildFamilyLink);
    }

    getSpouseFamilyLink(q) {
        return this.get(Tag.FAMILY_SPOUSE, q, SpouseFamilyLink);
    }

    getAssociation(q) {
        return this.get(Tag.ASSOCIATES, q, Association);
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

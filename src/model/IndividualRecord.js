import { _get } from '../utils';
import { Association } from './Association';
import { Changed } from './Changed';
import { ChildFamilyLink } from './ChildFamilyLink';
import { FamilyRecord } from './FamilyRecord';
import { IndividualAttribute } from './IndividualAttribute';
import { IndividualEventFamily } from './IndividualEventFamily';
import { IndividualEventFamilyAdoption } from './IndividualEventFamilyAdoption';
import { MultimediaReference } from './MultimediaReference';
import { Name } from './Name';
import { Node } from './Node';
import { Tag } from '../tag';
import { NoteReferenceMixin } from './NoteReferenceMixin';
import { ReferenceNumber } from './ReferenceNumber';
import { Sex } from './Sex';
import { IndividualEvent } from './IndividualEvent';
import { SourceReference } from './SourceReference';
import { SpouseFamilyLink } from './SpouseFamilyLink';

export class IndividualRecord extends Node {
    constructor(data) {
        super(data, IndividualRecord);
    }

    getName() {
        return this.getByTag(Tag.NAME, Name);
    }

    getSex() {
        return this.getByTag(Tag.SEX, Sex);
    }

    getFamilyAsChild() {
        const rootData = this._data.root._data;
        const tree = this._data.tree;
        const arrayTree = this._data.unit ? [tree] : tree;
        const arrayChildren = [], arrayParents = [];
        arrayTree.forEach((t, i) => {
            const family = rootData.as_child[t.pointer];
            if (family !== undefined) {
                arrayChildren.push(family);
                arrayParents.push(i);
            }
        });
        return this._newInstance(FamilyRecord, arrayChildren, arrayParents, this);
    }

    getFamilyAsSpouse() {
        const rootData = this._data.root._data;
        const tree = this._data.tree;
        const arrayTree = this._data.unit ? [tree] : tree;
        const arrayChildren = [], arrayParents = [];
        arrayTree.forEach((t, i) => {
            const families = _get(rootData.as_spouse, t.pointer, []);
            families.forEach(family => {
                arrayChildren.push(family);
                arrayParents.push(i);
            });
        });
        return this._newInstance(FamilyRecord, arrayChildren, arrayParents, this);
    }

    /* Events */

    getEventBirth() {
        return this.getByTag(Tag.BIRTH, IndividualEventFamily);
    }

    getEventChristening() {
        return this.getByTag(Tag.CHRISTENING, IndividualEventFamily);
    }

    getEventDeath() {
        return this.getByTag(Tag.DEATH, IndividualEvent);
    }

    getEventBurial() {
        return this.getByTag(Tag.BURIAL, IndividualEvent);
    }

    getEventCremation() {
        return this.getByTag(Tag.CREMATION, IndividualEvent);
    }

    getEventAdoption() {
        return this.getByTag(Tag.ADOPTION, IndividualEventFamilyAdoption);
    }

    getEventBaptism() {
        return this.getByTag(Tag.BAPTISM, IndividualEvent);
    }

    getEventBarMitzvah() {
        return this.getByTag(Tag.BAR_MITZVAH, IndividualEvent);
    }

    getEventBatMitzvah() {
        return this.getByTag(Tag.BAT_MITZVAH, IndividualEvent);
    }

    getEventAdultChristening() {
        return this.getByTag(Tag.ADULT_CHRISTENING, IndividualEvent);
    }

    getEventConfirmation() {
        return this.getByTag(Tag.CONFIRMATION, IndividualEvent);
    }

    getEventFirstCommunion() {
        return this.getByTag(Tag.FIRST_COMMUNION, IndividualEvent);
    }

    getEventNaturalization() {
        return this.getByTag(Tag.NATURALIZATION, IndividualEvent);
    }

    getEventEmigration() {
        return this.getByTag(Tag.EMIGRATION, IndividualEvent);
    }

    getEventImmigration() {
        return this.getByTag(Tag.IMMIGRATION, IndividualEvent);
    }

    getEventCensus() {
        return this.getByTag(Tag.CENSUS, IndividualEvent);
    }

    getEventProbate() {
        return this.getByTag(Tag.PROBATE, IndividualEvent);
    }

    getEventWill() {
        return this.getByTag(Tag.WILL, IndividualEvent);
    }

    getEventGraduation() {
        return this.getByTag(Tag.GRADUATION, IndividualEvent);
    }

    getEventRetirement() {
        return this.getByTag(Tag.RETIREMENT, IndividualEvent);
    }

    getEventOther() {
        return this.getByTag(Tag.EVENT, IndividualEvent);
    }

    /* End events */

    /* Attributes */

    getAttributeCaste() {
        return this.getByTag(Tag.CASTE, IndividualAttribute);
    }

    getAttributePhysicalDescription() {
        return this.getByTag(Tag.PHYSICAL_DESCRIPTION, IndividualAttribute);
    }

    getAttributeScholasticAchievement() {
        return this.getByTag(Tag.EDUCATION, IndividualAttribute);
    }

    getAttributeIdentificationNumber() {
        return this.getByTag(Tag.IDENTIFICATION_NUMBER, IndividualAttribute);
    }

    getAttributeNationality() {
        return this.getByTag(Tag.NATIONALITY, IndividualAttribute);
    }

    getAttributeChildrenCount() {
        return this.getByTag(Tag.CHILDREN_COUNT, IndividualAttribute);
    }

    getAttributeRelationshipCount() {
        return this.getByTag(Tag.MARRIAGE_COUNT, IndividualAttribute);
    }

    getAttributeOccupation() {
        return this.getByTag(Tag.OCCUPATION, IndividualAttribute);
    }

    getAttributePossessions() {
        return this.getByTag(Tag.PROPERTY, IndividualAttribute);
    }

    getAttributeReligiousAffiliation() {
        return this.getByTag(Tag.RELIGION, IndividualAttribute);
    }

    getAttributeResidence() {
        return this.getByTag(Tag.RESIDENCE, IndividualAttribute);
    }

    getAttributeNobilityTitle() {
        return this.getByTag(Tag.TITLE, IndividualAttribute);
    }

    getAttributeFact() {
        return this.getByTag(Tag.FACT, IndividualAttribute);
    }

    /* End attributes */

    getChildFamilyLink() {
        return this.getByTag(Tag.FAMILY_CHILD, ChildFamilyLink);
    }

    getSpouseFamilyLink() {
        return this.getByTag(Tag.FAMILY_SPOUSE, SpouseFamilyLink);
    }

    getAssociation() {
        return this.getByTag(Tag.ASSOCIATES, Association);
    }

    getReferenceNumber() {
        return this.getByTag(Tag.REFERENCE, ReferenceNumber);
    }

    getRecordIdentificationNumber() {
        return this.getByTag(Tag.RECORD_ID_NUMBER)
    }

    getChanged() {
        return this.getByTag(Tag.CHANGE, Changed);
    }

    getNote() {
        return this.getByTag(Tag.NOTE, NoteReferenceMixin);
    }

    getSource() {
        return this.getByTag(Tag.SOURCE, SourceReference);
    }

    getMultimedia() {
        return this.getByTag(Tag.OBJECT, MultimediaReference);
    }
}

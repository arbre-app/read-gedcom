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

    getName() {
        return this.get(Tag.NAME, Name);
    }

    getSex() {
        return this.get(Tag.SEX, Sex);
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
        return this.get(Tag.BIRTH, IndividualEventFamily);
    }

    getEventChristening() {
        return this.get(Tag.CHRISTENING, IndividualEventFamily);
    }

    getEventDeath() {
        return this.get(Tag.DEATH, IndividualEvent);
    }

    getEventBurial() {
        return this.get(Tag.BURIAL, IndividualEvent);
    }

    getEventCremation() {
        return this.get(Tag.CREMATION, IndividualEvent);
    }

    getEventAdoption() {
        return this.get(Tag.ADOPTION, IndividualEventFamilyAdoption);
    }

    getEventBaptism() {
        return this.get(Tag.BAPTISM, IndividualEvent);
    }

    getEventBarMitzvah() {
        return this.get(Tag.BAR_MITZVAH, IndividualEvent);
    }

    getEventBatMitzvah() {
        return this.get(Tag.BAT_MITZVAH, IndividualEvent);
    }

    getEventAdultChristening() {
        return this.get(Tag.ADULT_CHRISTENING, IndividualEvent);
    }

    getEventConfirmation() {
        return this.get(Tag.CONFIRMATION, IndividualEvent);
    }

    getEventFirstCommunion() {
        return this.get(Tag.FIRST_COMMUNION, IndividualEvent);
    }

    getEventNaturalization() {
        return this.get(Tag.NATURALIZATION, IndividualEvent);
    }

    getEventEmigration() {
        return this.get(Tag.EMIGRATION, IndividualEvent);
    }

    getEventImmigration() {
        return this.get(Tag.IMMIGRATION, IndividualEvent);
    }

    getEventCensus() {
        return this.get(Tag.CENSUS, IndividualEvent);
    }

    getEventProbate() {
        return this.get(Tag.PROBATE, IndividualEvent);
    }

    getEventWill() {
        return this.get(Tag.WILL, IndividualEvent);
    }

    getEventGraduation() {
        return this.get(Tag.GRADUATION, IndividualEvent);
    }

    getEventRetirement() {
        return this.get(Tag.RETIREMENT, IndividualEvent);
    }

    getEventOther() {
        return this.get(Tag.EVENT, IndividualEvent);
    }

    /* End events */

    /* Attributes */

    getAttributeCaste() {
        return this.get(Tag.CASTE, IndividualAttribute);
    }

    getAttributePhysicalDescription() {
        return this.get(Tag.PHYSICAL_DESCRIPTION, IndividualAttribute);
    }

    getAttributeScholasticAchievement() {
        return this.get(Tag.EDUCATION, IndividualAttribute);
    }

    getAttributeIdentificationNumber() {
        return this.get(Tag.IDENTIFICATION_NUMBER, IndividualAttribute);
    }

    getAttributeNationality() {
        return this.get(Tag.NATIONALITY, IndividualAttribute);
    }

    getAttributeChildrenCount() {
        return this.get(Tag.CHILDREN_COUNT, IndividualAttribute);
    }

    getAttributeRelationshipCount() {
        return this.get(Tag.MARRIAGE_COUNT, IndividualAttribute);
    }

    getAttributeOccupation() {
        return this.get(Tag.OCCUPATION, IndividualAttribute);
    }

    getAttributePossessions() {
        return this.get(Tag.PROPERTY, IndividualAttribute);
    }

    getAttributeReligiousAffiliation() {
        return this.get(Tag.RELIGION, IndividualAttribute);
    }

    getAttributeResidence() {
        return this.get(Tag.RESIDENCE, IndividualAttribute);
    }

    getAttributeNobilityTitle() {
        return this.get(Tag.TITLE, IndividualAttribute);
    }

    getAttributeFact() {
        return this.get(Tag.FACT, IndividualAttribute);
    }

    /* End attributes */

    getChildFamilyLink() {
        return this.get(Tag.FAMILY_CHILD, ChildFamilyLink);
    }

    getSpouseFamilyLink() {
        return this.get(Tag.FAMILY_SPOUSE, SpouseFamilyLink);
    }

    getAssociation() {
        return this.get(Tag.ASSOCIATES, Association);
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

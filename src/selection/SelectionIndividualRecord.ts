import { TreeNode, TreeIndexRoot } from '../tree';
import { SelectionWithMultimediaMixin, SelectionWithNoteSourceCitationMixin } from './mixin';
import { SelectionFamilyRecord, SelectionName, SelectionSex, SelectionIndividualEventFamily, SelectionIndividualEventFamilyAdoption, SelectionIndividualEvent, SelectionIndividualAttribute, SelectionChildFamilyLink, SelectionSpouseFamilyLink, SelectionAssociation } from './internal';

import { Tag } from '../tag';
import { SelectionRecord } from './base';

/**
 * An individual record.
 * <table>
 *  <tr><th>Pointer</th><td>Yes</td></tr>
 *  <tr><th>Value</th><td>No</td></tr>
 * </table>
 */
export class SelectionIndividualRecord extends SelectionWithMultimediaMixin(SelectionWithNoteSourceCitationMixin(SelectionRecord)) {
    getName() {
        return this.get(Tag.Name, null, SelectionName);
    }

    getSex(): SelectionSex {
        return this.get(Tag.Sex);
    }

    getFamilyAsChild() {
        const children: TreeNode[] = [];
        const rootIndex = this.rootNode._index as TreeIndexRoot | undefined;
        if (rootIndex !== undefined && rootIndex.asChild !== undefined) {
            for (let i = 0; i < this.length; i++) {
                const node = this[i];
                if (node.pointer !== null) {
                    const familiesIdx = rootIndex.asChild[node.pointer];
                    if (familiesIdx !== undefined) { // TODO this shouldn't happen, is it necessary?
                        familiesIdx.forEach(familyIdx => {
                            children.push(this.rootNode.children[familyIdx]);
                        });
                    }
                }
            }
        } else {
            // Pretty bad performance when the index is not available, but we don't have any other choice
            // Cost could be mitigated for large selections by using a hash set (but tricky due to multiplicity)
            const nodesFamily = this.rootNode.children.filter(nodeFamily => nodeFamily.tag === Tag.Family);
            for (let i = 0; i < this.length; i++) {
                const node = this[i];
                if (node.pointer !== null) {
                    nodesFamily.filter(nodeFamily => nodeFamily.children.some(nodeChild => nodeChild.tag === Tag.Child && nodeChild.value === node.pointer))
                        .forEach(nodeFamily => children.push(nodeFamily));
                }
            }
        }

        return new SelectionFamilyRecord(this.rootNode, children);
    }

    getFamilyAsSpouse() {
        const children: TreeNode[] = [];
        const rootIndex = this.rootNode._index as TreeIndexRoot | undefined;
        if (rootIndex !== undefined && rootIndex.asSpouse !== undefined) {
            for (let i = 0; i < this.length; i++) {
                const node = this[i];
                if (node.pointer !== null) {
                    const familiesIdx = rootIndex.asSpouse[node.pointer];
                    if (familiesIdx !== undefined) { // ditto
                        familiesIdx.forEach(familyIdx => {
                            children.push(this.rootNode.children[familyIdx]);
                        });
                    }
                }
            }
        } else {
            const nodesFamily = this.rootNode.children.filter(nodeFamily => nodeFamily.tag === Tag.Family);
            for (let i = 0; i < this.length; i++) {
                const node = this[i];
                if (node.pointer !== null) {
                    nodesFamily.filter(nodeFamily => nodeFamily.children.some(nodeChild => (nodeChild.tag === Tag.Husband || nodeChild.tag === Tag.Wife) && nodeChild.value === node.pointer))
                        .forEach(nodeFamily => children.push(nodeFamily));
                }
            }
        }

        return new SelectionFamilyRecord(this.rootNode, children);
    }

    /* Events */

    getEventBirth() {
        return this.get(Tag.Birth, null, SelectionIndividualEventFamily);
    }

    getEventChristening() {
        return this.get(Tag.Christening, null, SelectionIndividualEventFamily);
    }

    getEventDeath() {
        return this.get(Tag.Death, null, SelectionIndividualEvent);
    }

    getEventBurial() {
        return this.get(Tag.Burial, null, SelectionIndividualEvent);
    }

    getEventCremation() {
        return this.get(Tag.Cremation, null, SelectionIndividualEvent);
    }

    getEventAdoption() {
        return this.get(Tag.Adoption, null, SelectionIndividualEventFamilyAdoption);
    }

    getEventBaptism() {
        return this.get(Tag.Baptism, null, SelectionIndividualEvent);
    }

    getEventBarMitzvah() {
        return this.get(Tag.BarMitzvah, null, SelectionIndividualEvent);
    }

    getEventBatMitzvah() {
        return this.get(Tag.BatMitzvah, null, SelectionIndividualEvent);
    }

    getEventAdultChristening() {
        return this.get(Tag.AdultChristening, null, SelectionIndividualEvent);
    }

    getEventConfirmation() {
        return this.get(Tag.Confirmation, null, SelectionIndividualEvent);
    }

    getEventFirstCommunion() {
        return this.get(Tag.FirstCommunion, null, SelectionIndividualEvent);
    }

    getEventNaturalization() {
        return this.get(Tag.Naturalization, null, SelectionIndividualEvent);
    }

    getEventEmigration() {
        return this.get(Tag.Emigration, null, SelectionIndividualEvent);
    }

    getEventImmigration() {
        return this.get(Tag.Immigration, null, SelectionIndividualEvent);
    }

    getEventCensus() {
        return this.get(Tag.Census, null, SelectionIndividualEvent);
    }

    getEventProbate() {
        return this.get(Tag.Probate, null, SelectionIndividualEvent);
    }

    getEventWill() {
        return this.get(Tag.Will, null, SelectionIndividualEvent);
    }

    getEventGraduation() {
        return this.get(Tag.Graduation, null, SelectionIndividualEvent);
    }

    getEventRetirement() {
        return this.get(Tag.Retirement, null, SelectionIndividualEvent);
    }

    getEventOther() {
        return this.get(Tag.Event, null, SelectionIndividualEvent);
    }

    /* End events */

    /* Attributes */

    getAttributeCaste() {
        return this.get(Tag.Caste, null, SelectionIndividualAttribute);
    }

    getAttributePhysicalDescription() {
        return this.get(Tag.PhysicalDescription, null, SelectionIndividualAttribute);
    }

    getAttributeScholasticAchievement() {
        return this.get(Tag.Education, null, SelectionIndividualAttribute);
    }

    getAttributeIdentificationNumber() {
        return this.get(Tag.IdentificationNumber, null, SelectionIndividualAttribute);
    }

    getAttributeNationality() {
        return this.get(Tag.Nationality, null, SelectionIndividualAttribute);
    }

    getAttributeChildrenCount() {
        return this.get(Tag.ChildrenCount, null, SelectionIndividualAttribute);
    }

    getAttributeRelationshipCount() {
        return this.get(Tag.MarriageCount, null, SelectionIndividualAttribute);
    }

    getAttributeOccupation() {
        return this.get(Tag.Occupation, null, SelectionIndividualAttribute);
    }

    getAttributePossessions() {
        return this.get(Tag.Property, null, SelectionIndividualAttribute);
    }

    getAttributeReligiousAffiliation() {
        return this.get(Tag.Religion, null, SelectionIndividualAttribute);
    }

    getAttributeResidence() {
        return this.get(Tag.Residence, null, SelectionIndividualAttribute);
    }

    getAttributeNobilityTitle() {
        return this.get(Tag.Title, null, SelectionIndividualAttribute);
    }

    getAttributeFact() {
        return this.get(Tag.Fact, null, SelectionIndividualAttribute);
    }

    /* End attributes */

    getChildFamilyLink() {
        return this.get(Tag.FamilyChild, null, SelectionChildFamilyLink);
    }

    getSpouseFamilyLink() {
        return this.get(Tag.FamilySpouse, null, SelectionSpouseFamilyLink);
    }

    getAssociation() {
        return this.get(Tag.Associates, null, SelectionAssociation);
    }
}

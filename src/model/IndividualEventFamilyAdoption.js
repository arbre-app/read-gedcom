import { Tag } from '../tag';
import { FamilyReferenceAdoption } from './FamilyReferenceAdoption';
import { IndividualEvent } from './IndividualEvent';

export class IndividualEventFamilyAdoption extends IndividualEvent {
    constructor(data) {
        super(data, IndividualEventFamilyAdoption);
    }

    getFamilyAsChildReference() {
        return this.getByTag(Tag.FAMILY_CHILD, FamilyReferenceAdoption);
    }
}

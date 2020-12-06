import { Tag } from '../tag';
import { FamilyReferenceAdoption } from './FamilyReferenceAdoption';
import { IndividualEvent } from './IndividualEvent';

export class IndividualEventFamilyAdoption extends IndividualEvent {
    constructor(data, clazz) {
        super(data, clazz || IndividualEventFamilyAdoption);
    }

    getFamilyAsChildReference(q) {
        return this.get(Tag.FAMILY_CHILD, q, FamilyReferenceAdoption);
    }
}

import { SelectionFamilyReferenceAdoption, SelectionIndividualEvent } from './internal';
import { Tag } from '../tag';

export class SelectionIndividualEventFamilyAdoption extends SelectionIndividualEvent {
    getFamilyAsChildReference() {
        return this.get(Tag.FamilyChild, null, SelectionFamilyReferenceAdoption);
    }
}

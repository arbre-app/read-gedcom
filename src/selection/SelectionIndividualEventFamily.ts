import { SelectionFamilyReference, SelectionIndividualEvent } from './internal';
import { Tag } from '../tag';

export class SelectionIndividualEventFamily extends SelectionIndividualEvent {
    getFamilyAsChildReference() {
        return this.get(Tag.FamilyChild, null, SelectionFamilyReference);
    }
}

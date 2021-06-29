import { SelectionFamilyReference } from './SelectionFamilyReference';
import { GedcomTag } from '../tag';
import { SelectionIndividualEvent } from './SelectionIndividualEvent';

export class SelectionIndividualEventFamily extends SelectionIndividualEvent {
    getFamilyAsChildReference() {
        return this.get(GedcomTag.FamilyChild, null, SelectionFamilyReference);
    }
}

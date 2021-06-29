import { SelectionAdoption } from './SelectionAdoption';
import { GedcomTag } from '../tag';
import { SelectionFamilyReference } from './SelectionFamilyReference';

export class SelectionFamilyReferenceAdoption extends SelectionFamilyReference {
    getAdoptedByWhom() {
        return this.get(GedcomTag.Adoption, null, SelectionAdoption);
    }
}

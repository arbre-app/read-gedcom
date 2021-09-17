import { SelectionAdoption, SelectionFamilyReference } from './internal';
import { Tag } from '../tag';

export class SelectionFamilyReferenceAdoption extends SelectionFamilyReference {
    getAdoptedByWhom(): SelectionAdoption {
        return this.get(Tag.Adoption);
    }
}

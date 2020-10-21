import { Adoption } from './Adoption';
import { FamilyReference } from './FamilyReference';
import { Tag } from '../tag';

export class FamilyReferenceAdoption extends FamilyReference {
    constructor(data) {
        super(data, FamilyReferenceAdoption);
    }

    getAdoptedByWhom() {
        return this.getByTag(Tag.ADOPTION, Adoption);
    }
}

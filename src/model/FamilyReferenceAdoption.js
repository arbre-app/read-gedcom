import { Adoption } from './Adoption';
import { FamilyReference } from './FamilyReference';
import { Tag } from '../tag';

export class FamilyReferenceAdoption extends FamilyReference {
    constructor(data, clazz) {
        super(data, clazz || FamilyReferenceAdoption);
    }

    getAdoptedByWhom() {
        return this.get(Tag.ADOPTION, Adoption);
    }
}

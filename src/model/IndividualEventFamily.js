import { Tag } from '../tag';
import { FamilyReference } from './FamilyReference';
import { IndividualEvent } from './IndividualEvent';

export class IndividualEventFamily extends IndividualEvent {
    constructor(data, clazz) {
        super(data, clazz || IndividualEventFamily);
    }

    getFamilyAsChildReference(q) {
        return this.get(Tag.FAMILY_CHILD, q, FamilyReference);
    }
}

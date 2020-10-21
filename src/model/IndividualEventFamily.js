import { Tag } from '../tag';
import { FamilyReference } from './FamilyReference';
import { IndividualEvent } from './IndividualEvent';

export class IndividualEventFamily extends IndividualEvent {
    constructor(data) {
        super(data, IndividualEventFamily);
    }

    getFamilyAsChildReference() {
        return this.getByTag(Tag.FAMILY_CHILD, FamilyReference);
    }
}

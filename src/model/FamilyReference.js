import { Tag } from '../tag';
import { FamilyRecord } from './FamilyRecord';
import { Reference } from './Reference';

export class FamilyReference extends Reference {
    constructor(data) {
        super(data, FamilyReference);
    }

    getFamilyRecord() {
        return this.getGedcom().getByTagPointers(Tag.FAMILY, this.array().map(o => o.value()), FamilyRecord);
    }
}

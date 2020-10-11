import { IndividualRecord } from './IndividualRecord';
import { Tag } from '../tag';
import { Reference } from './Reference';

export class IndividualReference extends Reference {
    constructor(data) {
        super(data, IndividualReference);
    }

    getIndividualRecord() {
        return this.getGedcom().getByTagPointers(Tag.INDIVIDUAL, this.array().map(o => o.value()), IndividualRecord);
    }
}

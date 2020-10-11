import { Tag } from '../tag';
import { Reference } from './Reference';
import { SubmitterRecord } from './SubmitterRecord';

export class SubmitterReference extends Reference {
    constructor(data) {
        super(data, SubmitterReference);
    }

    getSubmitterRecord() {
        return this.getGedcom().getByTagPointers(Tag.SUBMITTER, this.array().map(o => o.value()), SubmitterRecord);
    }
}

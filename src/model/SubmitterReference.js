import { Node } from './Node';
import { Tag } from '../tag';
import { SubmitterRecord } from './SubmitterRecord';

export class SubmitterReference extends Node {
    constructor(data) {
        super(data, SubmitterReference);
    }

    getSubmitter() {
        return this.getGedcom().getByTagPointers(Tag.SUBMITTER, this.array().map(o => o.value()), SubmitterRecord);
    }
}

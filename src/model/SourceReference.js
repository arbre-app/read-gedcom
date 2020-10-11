import { Node } from './Node';
import { Tag } from '../tag';
import { SourceRecord } from './SourceRecord';

export class SourceReference extends Node {
    constructor(data) {
        super(data, SourceReference);
    }

    getSourceRecord() {
        return this.getGedcom().getByTagPointers(Tag.SOURCE, this.array().map(o => o.value()), SourceRecord);
    }
}

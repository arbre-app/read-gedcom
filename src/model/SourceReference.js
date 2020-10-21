import { Node } from './Node';
import { Tag } from '../tag';
import { SourceRecord } from './SourceRecord';

export class SourceReference extends Node {
    constructor(data) {
        super(data, SourceReference);
    }

    // TODO: in usage, rename `getSource` to `getSourceCitation`

    getSourceRecord() {
        return this.getGedcom().getByTagPointers(Tag.SOURCE, this.array().map(o => o.value()), SourceRecord);
    }
}

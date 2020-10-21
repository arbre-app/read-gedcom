import { Node } from './Node';

export class SourceCitation extends Node {
    constructor(data, clazz) {
        super(data, clazz || SourceCitation);
    }

    getSourceRecord() {
        return this.getGedcom().getSourceRecord(this.value());
    }

    // TODO
}

import { Tag } from '../tag';
import { Node } from './Node';

export class RepositoryReference extends Node {
    constructor(data, clazz) {
        super(data, clazz || RepositoryReference);
    }

    getRepositoryRecord() {
        return this.getGedcom().getRepositoryRecord(this.value());
    }

    getSourceCallNumber() {
        return this.get(Tag.CALL_NUMBER);
    }
}

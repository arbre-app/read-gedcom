import { Tag } from '../tag';
import { Node } from './Node';

export class RepositoryReference extends Node {
    constructor(data, clazz) {
        super(data, clazz || RepositoryReference);
    }

    getRepositoryRecord(q) {
        return this.getGedcom().getRepositoryRecord(this.value().all(), q);
    }

    getSourceCallNumber(q) {
        return this.get(Tag.CALL_NUMBER, q);
    }
}

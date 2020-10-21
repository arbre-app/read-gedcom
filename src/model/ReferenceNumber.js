import { Tag } from '../tag';
import { Node } from './Node';

export class ReferenceNumber extends Node {
    constructor(data) {
        super(data, ReferenceNumber);
    }

    getType() {
        return this.getByTag(Tag.TYPE);
    }
}

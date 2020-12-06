import { Tag } from '../tag';
import { Node } from './Node';

export class ReferenceNumber extends Node {
    constructor(data, clazz) {
        super(data, clazz || ReferenceNumber);
    }

    getType(q) {
        return this.get(Tag.TYPE, q);
    }
}

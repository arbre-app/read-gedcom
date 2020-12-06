import { Node } from './Node';
import { Tag } from '../tag';

export class SubmitterRecord extends Node {
    constructor(data, clazz) {
        super(data, clazz || SubmitterRecord);
    }

    getName(q) {
        return this.get(Tag.NAME, q);
    }


}

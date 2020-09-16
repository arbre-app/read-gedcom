import { Node } from './Node';
import { Tag } from '../tag';

export class SubmitterRecord extends Node {
    constructor(data) {
        super(data, SubmitterRecord);
    }

    getName() {
        return this.getByTag(Tag.NAME);
    }


}

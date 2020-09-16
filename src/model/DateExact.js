import { Node } from './Node';
import { Time } from './Time';
import { Tag } from '../tag';

export class DateExact extends Node {
    constructor(data) {
        super(data, DateExact);
    }

    getTime() {
        return this.getByTag(Tag.TIME, Time);
    }
}

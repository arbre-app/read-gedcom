import { parseDateExact } from '../parse/date';
import { Node } from './Node';
import { Time } from './Time';
import { Tag } from '../tag';

export class DateExact extends Node {
    constructor(data, clazz) {
        super(data, clazz || DateExact);
    }

    valueAsExactDate() {
        return this.value().map(parseDateExact);
    }

    getTime(q) {
        return this.get(Tag.TIME, q, Time);
    }
}

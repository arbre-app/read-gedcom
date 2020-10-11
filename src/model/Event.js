import { Date } from './Date';
import { Node } from './Node';
import { Tag } from '../tag';
import { Place } from './Place';

export class Event extends Node {
    constructor(data) {
        super(data, Event);
    }

    getType() {
        return this.getByTag(Tag.TYPE, undefined);
    }

    getDate() {
        return this.getByTag(Tag.DATE, Date);
    }

    getPlace() {
        return this.getByTag(Tag.PLACE, Place);
    }
}

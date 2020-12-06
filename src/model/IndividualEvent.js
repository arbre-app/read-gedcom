import { Event } from './Event';
import { Tag } from '../tag';

export class IndividualEvent extends Event {
    constructor(data, clazz) {
        super(data, clazz || Event);
    }

    getAge(q) {
        return this.get(Tag.AGE, q);
    }
}

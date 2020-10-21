import { Event } from './Event';
import { Tag } from '../tag';

export class IndividualEvent extends Event {
    constructor(data) {
        super(data, Event);
    }

    getAge() {
        return this.getByTag(Tag.AGE);
    }
}

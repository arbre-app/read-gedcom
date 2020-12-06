import { Tag } from '../tag';
import { DatePeriod } from './DatePeriod';
import { MetaEvent } from './MetaEvent';

export class EventsRecorded extends MetaEvent {
    constructor(data, clazz) {
        super(data, clazz || EventsRecorded);
    }

    getPlace(q) {
        return this.get(Tag.PLACE, q);
    }

    getDate(q) {
        return this.get(Tag.DATE, q, DatePeriod);
    }
}

import { Tag } from '../tag';
import { DatePeriod } from './DatePeriod';
import { MetaEvent } from './MetaEvent';

export class EventsRecorded extends MetaEvent {
    constructor(data, clazz) {
        super(data, clazz || EventsRecorded);
    }

    getPlace() {
        return this.get(Tag.PLACE);
    }

    getDate() {
        return this.get(Tag.DATE, DatePeriod);
    }
}

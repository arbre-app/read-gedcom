import { SelectionDatePeriod, SelectionMetaEvent, SelectionPlace } from './internal';
import { Tag } from '../tag';

export class SelectionEventsRecorded extends SelectionMetaEvent {
    getPlace() {
        return this.get(Tag.Place, null, SelectionPlace);
    }

    getDatePeriod() {
        return this.get(Tag.Date, null, SelectionDatePeriod);
    }
}

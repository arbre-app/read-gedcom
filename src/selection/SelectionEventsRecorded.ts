import { SelectionDatePeriod } from './SelectionDatePeriod';
import { GedcomTag } from '../tag';
import { SelectionMetaEvent } from './SelectionMetaEvent';

export class SelectionEventsRecorded extends SelectionMetaEvent {
    getPlace() {
        return this.get(GedcomTag.Place);
    }

    getDate() {
        return this.get(GedcomTag.Date, null, SelectionDatePeriod);
    }
}

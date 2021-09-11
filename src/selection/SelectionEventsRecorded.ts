import { SelectionDatePeriod } from './SelectionDatePeriod';
import { GedcomTag } from '../tag';
import { SelectionMetaEvent } from './SelectionMetaEvent';
import { SelectionPlace } from './SelectionPlace';

export class SelectionEventsRecorded extends SelectionMetaEvent {
    getPlace() {
        return this.get(GedcomTag.Place, null, SelectionPlace);
    }

    getDatePeriod() {
        return this.get(GedcomTag.Date, null, SelectionDatePeriod);
    }
}

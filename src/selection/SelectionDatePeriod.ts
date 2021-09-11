import { SelectionAny } from './SelectionAny';
import { parseDate } from '../parse';
import { SelectionDate } from './SelectionDate';

export class SelectionDatePeriod extends SelectionDate {
    valueAsDatePeriod() {
        return this.value().map(v => {
            const date = parseDate(v);
            if (date !== null && date.isDatePeriod) {
                return date;
            } else {
                return null;
            }
        });
    }
}

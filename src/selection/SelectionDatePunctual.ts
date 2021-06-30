import { SelectionAny } from './SelectionAny';
import { parseDate } from '../parse';

export class SelectionDatePunctual extends SelectionAny {
    valueAsDate() {
        return this.value().map(v => {
            const date = parseDate(v);
            if (date !== null && date.isDatePunctual && !date.isDateApproximated) { // TODO check this
                return date;
            } else {
                return null;
            }
        });
    }
}

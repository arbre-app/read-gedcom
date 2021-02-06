import { parseDate } from '../parse/date';
import { Node } from './Node';

export class DatePunctual extends Node {
    constructor(data, clazz) {
        super(data, clazz || DatePunctual);
    }

    valueAsDate() {
        return this.value().map(v => {
            const date = parseDate(v);
            if (date !== null && date.isDatePunctual && !date.isDateApproximate) { // TODO check this
                return date;
            } else {
                return null;
            }
        });
    }
}

import { parseDate } from '../parse';
import { Node } from './Node';

export class DatePeriod extends Node {
    constructor(data, clazz) {
        super(data, clazz || DatePeriod);
    }

    valueAsDate() {
        return this.valueMap(v => {
            const date = parseDate(v);
            if (date !== null && date.isDatePeriod) {
                return date;
            } else {
                return null;
            }
        });
    }
}
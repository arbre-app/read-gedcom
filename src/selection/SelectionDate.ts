import { SelectionAny } from './internal';
import { parseDate } from '../parse';

export class SelectionDate extends SelectionAny {
    valueAsDate() {
        return this.value().map(parseDate);
    }
}

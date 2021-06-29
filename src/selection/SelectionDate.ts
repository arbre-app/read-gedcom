import { SelectionAny } from './Selection';
import { parseDate } from '../parse';

export class SelectionDate extends SelectionAny {
    valueAsDate() {
        return this.value().map(parseDate);
    }
}

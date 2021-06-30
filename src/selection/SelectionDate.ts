import { SelectionAny } from './SelectionAny';
import { parseDate } from '../parse';

export class SelectionDate extends SelectionAny {
    valueAsDate() {
        return this.value().map(parseDate);
    }
}

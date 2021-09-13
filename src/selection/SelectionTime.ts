import { parseExactTime } from '../parse';
import { SelectionAny } from './internal';

export class SelectionTime extends SelectionAny {
    valueAsExactTime() {
        return this.value().map(parseExactTime);
    }
}

import { parseExactTime } from '../parse/value/date';
import { SelectionAny } from './SelectionAny';

export class SelectionTime extends SelectionAny {

    valueAsExactTime() {
        return this.value().map(parseExactTime);
    }

}

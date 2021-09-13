import { parseAge } from '../parse';
import { SelectionAny } from './internal';

export class SelectionAge extends SelectionAny {
    valueAsAge() {
        return this.value().map(parseAge);
    }
}

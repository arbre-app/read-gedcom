import { parseAge } from '../parse';
import { SelectionAny } from './SelectionAny';

export class SelectionAge extends SelectionAny {
    valueAsAge() {
        return this.value().map(parseAge);
    }
}

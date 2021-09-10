import { parseLatitude } from '../parse';
import { SelectionAny } from './SelectionAny';

export class SelectionLatitude extends SelectionAny {
    valueAsLatitude() {
        return this.value().map(parseLatitude);
    }
}

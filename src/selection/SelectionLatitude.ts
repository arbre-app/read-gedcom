import { parseLatitude } from '../parse';
import { SelectionAny } from './internal';

export class SelectionLatitude extends SelectionAny {
    valueAsLatitude() {
        return this.value().map(parseLatitude);
    }
}

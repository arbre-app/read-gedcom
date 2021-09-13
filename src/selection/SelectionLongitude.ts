import { parseLongitude } from '../parse';
import { SelectionAny } from './internal';

export class SelectionLongitude extends SelectionAny {
    valueAsLongitude() {
        return this.value().map(parseLongitude);
    }
}

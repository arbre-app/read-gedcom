import { parseLongitude } from '../parse';
import { SelectionAny } from './SelectionAny';

export class SelectionLongitude extends SelectionAny {
    valueAsLongitude() {
        return this.value().map(parseLongitude);
    }
}

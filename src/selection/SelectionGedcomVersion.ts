import { parseVersionParts } from '../parse';
import { SelectionAny } from './internal';

export class SelectionGedcomVersion extends SelectionAny {
    valueAsVersion() {
        return this.value().map(parseVersionParts);
    }
}

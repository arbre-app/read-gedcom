import { SelectionRomanizationMethod, SelectionAny } from './internal';
import { Tag } from '../tag';

export class SelectionRomanization extends SelectionAny {
    getMethod() {
        return this.get(Tag.Type, null, SelectionRomanizationMethod);
    }
}

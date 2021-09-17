import { SelectionRomanizationMethod, SelectionAny } from './internal';
import { Tag } from '../tag';

export class SelectionRomanization extends SelectionAny {
    getMethod(): SelectionRomanizationMethod {
        return this.get(Tag.Type);
    }
}

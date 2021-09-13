import { SelectionPhonetizationMethod, SelectionAny } from './internal';
import { Tag } from '../tag';

export class SelectionPhonetization extends SelectionAny {
    getMethod() {
        return this.get(Tag.Type, null, SelectionPhonetizationMethod);
    }
}

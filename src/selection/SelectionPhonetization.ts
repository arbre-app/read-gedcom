import { SelectionPhonetizationMethod, SelectionAny } from './internal';
import { Tag } from '../tag';

export class SelectionPhonetization extends SelectionAny {
    getMethod(): SelectionPhonetizationMethod {
        return this.get(Tag.Type);
    }
}

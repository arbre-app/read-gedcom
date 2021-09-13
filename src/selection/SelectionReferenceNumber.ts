import { Tag } from '../tag';
import { SelectionAny } from './internal';

export class SelectionReferenceNumber extends SelectionAny {
    getType() {
        return this.get(Tag.Type);
    }
}

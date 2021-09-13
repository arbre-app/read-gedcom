import { Tag } from '../tag';
import { SelectionAny, SelectionDateExact } from './internal';
import { SelectionWithNoteMixin } from './mixin';

export class SelectionChanged extends SelectionWithNoteMixin(SelectionAny) {
    getExactDate() {
        return this.get(Tag.Date, null, SelectionDateExact);
    }
}

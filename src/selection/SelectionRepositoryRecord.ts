import { SelectionWithAddressMixin } from './internal';
import { Tag } from '../tag';
import { SelectionRecord } from './base';
import { SelectionWithNoteMixin } from './mixin';

export class SelectionRepositoryRecord extends SelectionWithAddressMixin(SelectionWithNoteMixin(SelectionRecord)) {
    getName() {
        return this.get(Tag.Name);
    }
}

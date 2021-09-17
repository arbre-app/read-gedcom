import { Tag } from '../tag';
import { SelectionRecord } from './base';
import { SelectionWithAddressMixin, SelectionWithMultimediaMixin, SelectionWithNoteMixin } from './mixin';

export class SelectionSubmitterRecord extends SelectionWithMultimediaMixin(SelectionWithAddressMixin(SelectionWithNoteMixin(SelectionRecord))) {
    getName() {
        return this.get(Tag.Name);
    }
}

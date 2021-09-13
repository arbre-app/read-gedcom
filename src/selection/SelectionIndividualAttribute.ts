import { Tag } from '../tag';
import { SelectionIndividualEvent } from './internal';

export class SelectionIndividualAttribute extends SelectionIndividualEvent {
    getType() {
        return this.get(Tag.Type);
    }
}

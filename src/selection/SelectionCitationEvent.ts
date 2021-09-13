import { Tag } from '../tag';
import { SelectionMetaEvent } from './internal';

export class SelectionCitationEvent extends SelectionMetaEvent {
    getRole() {
        return this.get(Tag.Role);
    }
}

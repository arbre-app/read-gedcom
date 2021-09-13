import { SelectionSpouseEventDetails, SelectionEvent } from './internal';
import { Tag } from '../tag';

export class SelectionFamilyEvent extends SelectionEvent {
    getHusbandDetails() {
        return this.get(Tag.Husband, null, SelectionSpouseEventDetails);
    }

    getWifeDetails() {
        return this.get(Tag.Wife, null, SelectionSpouseEventDetails);
    }
}

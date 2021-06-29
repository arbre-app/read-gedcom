import { SelectionSpouseEventDetails } from './SelectionSpouseEventDetails';
import { GedcomTag } from '../tag';
import { SelectionEvent } from './SelectionEvent';

export class SelectionFamilyEvent extends SelectionEvent {
    getHusbandDetails() {
        return this.get(GedcomTag.Husband, null, SelectionSpouseEventDetails);
    }

    getWifeDetails() {
        return this.get(GedcomTag.Wife, null, SelectionSpouseEventDetails);
    }
}

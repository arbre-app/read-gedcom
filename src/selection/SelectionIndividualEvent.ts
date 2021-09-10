import { GedcomTag } from '../tag';
import { SelectionAge } from './SelectionAge';
import { SelectionEvent } from './SelectionEvent';

export class SelectionIndividualEvent extends SelectionEvent {
    getAge() {
        return this.get(GedcomTag.Age, null, SelectionAge);
    }
}

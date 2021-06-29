import { GedcomTag } from '../tag';
import { SelectionEvent } from './SelectionEvent';

export class SelectionIndividualEvent extends SelectionEvent {
    getAge() {
        return this.get(GedcomTag.Age);
    }
}

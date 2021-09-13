import { Tag } from '../tag';
import { SelectionAge, SelectionEvent } from './internal';

export class SelectionIndividualEvent extends SelectionEvent {
    getAge() {
        return this.get(Tag.Age, null, SelectionAge);
    }
}

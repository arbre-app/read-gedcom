import { Tag } from '../tag';
import { SelectionAge, SelectionAny } from './internal';

export class SelectionSpouseEventDetails extends SelectionAny {
    getAge() {
        return this.get(Tag.Age, null, SelectionAge);
    }
}

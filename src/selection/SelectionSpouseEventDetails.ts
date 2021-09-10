import { GedcomTag } from '../tag';
import { SelectionAge } from './SelectionAge';
import { SelectionAny } from './SelectionAny';

export class SelectionSpouseEventDetails extends SelectionAny {
    getAge() {
        return this.get(GedcomTag.Age, null, SelectionAge);
    }
}

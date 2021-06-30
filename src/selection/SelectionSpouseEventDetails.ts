import { GedcomTag } from '../tag';
import { SelectionAny } from './SelectionAny';

export class SelectionSpouseEventDetails extends SelectionAny {
    getAge() {
        return this.get(GedcomTag.Age);
    }
}

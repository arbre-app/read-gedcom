import { GedcomTag } from '../tag';
import { SelectionAny } from './Selection';

export class SelectionSpouseEventDetails extends SelectionAny {
    
    getAge() {
        return this.get(GedcomTag.Age);
    }
}

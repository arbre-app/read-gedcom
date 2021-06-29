import { GedcomTag } from '../tag';
import { GedcomSelection } from './GedcomSelection';

export class SelectionSpouseEventDetails extends GedcomSelection {
    
    getAge() {
        return this.get(GedcomTag.Age);
    }
}

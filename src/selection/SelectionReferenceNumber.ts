import { GedcomTag } from '../tag';
import { GedcomSelection } from './GedcomSelection';

export class SelectionReferenceNumber extends GedcomSelection {
    
    getType() {
        return this.get(GedcomTag.Type);
    }
}

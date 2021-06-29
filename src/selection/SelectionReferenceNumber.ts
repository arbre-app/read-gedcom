import { GedcomTag } from '../tag';
import { SelectionAny } from './Selection';

export class SelectionReferenceNumber extends SelectionAny {
    
    getType() {
        return this.get(GedcomTag.Type);
    }
}

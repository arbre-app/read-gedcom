import { GedcomTag } from '../tag';
import { SelectionAny } from './SelectionAny';

export class SelectionReferenceNumber extends SelectionAny {
    getType() {
        return this.get(GedcomTag.Type);
    }
}

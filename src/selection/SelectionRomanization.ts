import { SelectionRomanizationMethod } from './SelectionRomanizationMethod';
import { GedcomTag } from '../tag';
import { SelectionAny } from './SelectionAny';

export class SelectionRomanization extends SelectionAny {
    getMethod() {
        return this.get(GedcomTag.Type, null, SelectionRomanizationMethod);
    }
}

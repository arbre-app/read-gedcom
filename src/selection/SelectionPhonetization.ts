import { SelectionPhonetizationMethod } from './SelectionPhonetizationMethod';
import { GedcomTag } from '../tag';
import { SelectionAny } from './SelectionAny';

export class SelectionPhonetization extends SelectionAny {
    getMethod() {
        return this.get(GedcomTag.Type, null, SelectionPhonetizationMethod);
    }
}

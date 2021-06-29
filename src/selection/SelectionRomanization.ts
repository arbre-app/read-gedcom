import { SelectionRomanizationMethod } from './SelectionRomanizationMethod';
import { GedcomTag } from '../tag';
import { GedcomSelection } from './GedcomSelection';

export class SelectionRomanization extends GedcomSelection {
    
    getMethod() {
        return this.get(GedcomTag.Type, null, SelectionRomanizationMethod);
    }
}

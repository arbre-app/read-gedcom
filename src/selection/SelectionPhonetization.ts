import { SelectionPhonetizationMethod } from './SelectionPhonetizationMethod';
import { GedcomTag } from '../tag';
import { GedcomSelection } from './GedcomSelection';

export class SelectionPhonetization extends GedcomSelection {
    
    getMethod() {
        return this.get(GedcomTag.Type, null, SelectionPhonetizationMethod);
    }
}

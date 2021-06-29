import { SelectionGedcomVersion } from './SelectionGedcomVersion';
import { SelectionGedcomForm } from './SelectionGedcomForm';
import { GedcomTag } from '../tag';
import { GedcomSelection } from './GedcomSelection';

export class SelectionGedcomFile extends GedcomSelection {
    
    getVersion() {
        return this.get(GedcomTag.Version, null, SelectionGedcomVersion);
    }

    getGedcomForm() {
        return this.get(GedcomTag.Format, null, SelectionGedcomForm);
    }
}

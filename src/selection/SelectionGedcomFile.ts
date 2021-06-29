import { SelectionGedcomVersion } from './SelectionGedcomVersion';
import { SelectionGedcomForm } from './SelectionGedcomForm';
import { GedcomTag } from '../tag';
import { SelectionAny } from './Selection';

export class SelectionGedcomFile extends SelectionAny {
    getVersion() {
        return this.get(GedcomTag.Version, null, SelectionGedcomVersion);
    }

    getGedcomForm() {
        return this.get(GedcomTag.Format, null, SelectionGedcomForm);
    }
}

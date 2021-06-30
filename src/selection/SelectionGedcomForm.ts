import { GedcomTag } from '../tag';
import { SelectionAny } from './SelectionAny';

export class SelectionGedcomForm extends SelectionAny {
    getVersion() {
        return this.get(GedcomTag.Version);
    }

    getName() {
        return this.get(GedcomTag.Name);
    }
}

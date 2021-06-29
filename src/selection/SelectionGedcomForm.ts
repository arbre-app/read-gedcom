import { GedcomTag } from '../tag';
import { SelectionAny } from './Selection';

export class SelectionGedcomForm extends SelectionAny {

    getVersion() {
        return this.get(GedcomTag.Version);
    }

    getName() {
        return this.get(GedcomTag.Name);
    }
}

import { GedcomTag } from '../tag';
import { GedcomSelection } from './GedcomSelection';

export class SelectionGedcomForm extends GedcomSelection {

    getVersion() {
        return this.get(GedcomTag.Version);
    }

    getName() {
        return this.get(GedcomTag.Name);
    }
}

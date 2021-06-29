import { SelectionDate } from './SelectionDate';
import { GedcomTag } from '../tag';
import { GedcomSelection } from './GedcomSelection';

export class SelectionCitationData extends GedcomSelection {
    
    getDate() {
        return this.get(GedcomTag.Date, null, SelectionDate);
    }

    getText() {
        return this.get(GedcomTag.Text);
    }
}

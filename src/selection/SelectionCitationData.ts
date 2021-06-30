import { SelectionDate } from './SelectionDate';
import { GedcomTag } from '../tag';
import { SelectionAny } from './SelectionAny';

export class SelectionCitationData extends SelectionAny {
    getDate() {
        return this.get(GedcomTag.Date, null, SelectionDate);
    }

    getText() {
        return this.get(GedcomTag.Text);
    }
}

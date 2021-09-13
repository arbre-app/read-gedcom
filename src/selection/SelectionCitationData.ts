import { SelectionDate, SelectionAny } from './internal';
import { Tag } from '../tag';

export class SelectionCitationData extends SelectionAny {
    getDate() {
        return this.get(Tag.Date, null, SelectionDate);
    }

    getText() {
        return this.get(Tag.Text);
    }
}

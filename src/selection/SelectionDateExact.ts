import { SelectionTime } from './SelectionTime';
import { GedcomTag } from '../tag';
import { SelectionAny } from './Selection';
import { parseDateExact } from '../parse';

export class SelectionDateExact extends SelectionAny {
    valueAsExactDate() {
        return this.value().map(parseDateExact);
    }

    getTime() {
        return this.get(GedcomTag.Time, null, SelectionTime);
    }
}

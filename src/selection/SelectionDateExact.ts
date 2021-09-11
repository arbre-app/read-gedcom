import { SelectionTime } from './SelectionTime';
import { GedcomTag } from '../tag';
import { SelectionAny } from './SelectionAny';
import { parseExactDate } from '../parse';

export class SelectionDateExact extends SelectionAny {
    valueAsExactDate() {
        return this.value().map(parseExactDate);
    }

    getExactTime() {
        return this.get(GedcomTag.Time, null, SelectionTime);
    }
}

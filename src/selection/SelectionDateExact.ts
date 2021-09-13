import { SelectionTime, SelectionAny } from './internal';
import { Tag } from '../tag';

import { parseExactDate } from '../parse';

export class SelectionDateExact extends SelectionAny {
    valueAsExactDate() {
        return this.value().map(parseExactDate);
    }

    getExactTime() {
        return this.get(Tag.Time, null, SelectionTime);
    }
}

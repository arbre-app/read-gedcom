import { SelectionEventsRecorded, SelectionAny } from './internal';
import { Tag } from '../tag';

import { SelectionWithNoteMixin } from './mixin';

export class SelectionSourceData extends SelectionWithNoteMixin(SelectionAny) {
    getEventsRecorded() {
        return this.get(Tag.Event, null, SelectionEventsRecorded);
    }

    getResponsibleAgency() {
        return this.get(Tag.Agency);
    }
}

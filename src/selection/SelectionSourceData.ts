import { SelectionEventsRecorded } from './SelectionEventsRecorded';
import { GedcomTag } from '../tag';
import { SelectionAny } from './Selection';
import { SelectionWithNoteMixin } from './mixin';

export class SelectionSourceData extends SelectionWithNoteMixin(SelectionAny) {
    getEventsRecorded() {
        return this.get(GedcomTag.Event, null, SelectionEventsRecorded);
    }

    getResponsibleAgency() {
        return this.get(GedcomTag.Agency);
    }
}

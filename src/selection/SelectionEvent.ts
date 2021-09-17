import { ValueEvent } from '../value';
import { SelectionWithAddressMixin, SelectionWithMultimediaMixin, SelectionWithNoteSourceCitationMixin } from './mixin';
import { SelectionAny, SelectionDate, SelectionPlace } from './internal';

import { Tag } from '../tag';

export class SelectionEvent extends SelectionWithAddressMixin(SelectionWithMultimediaMixin(SelectionWithNoteSourceCitationMixin(SelectionAny))) {
    valueAsHappened() {
        return this.value().map(v => v ? (v === ValueEvent.Yes ? true : null) : false);
    }

    getType() {
        return this.get(Tag.Type);
    }

    getDate() {
        return this.get(Tag.Date, null, SelectionDate);
    }

    getPlace() {
        return this.get(Tag.Place, null, SelectionPlace);
    }

    getResponsibleAgency() {
        return this.get(Tag.Agency);
    }

    getReligiousAffiliation() {
        return this.get(Tag.Religion);
    }

    getCause() {
        return this.get(Tag.Cause);
    }
}

import { SelectionWithAddressMixin, SelectionWithNoteSourceCitationMixin } from './mixin';
import { SelectionAny } from './SelectionAny';
import { SelectionDate } from './SelectionDate';
import { SelectionPlace } from './SelectionPlace';
import { SelectionMultimediaReference } from './SelectionMultimediaReference';
import { GedcomTag } from '../tag';
import { GedcomValue } from '../value';

export class SelectionEvent extends SelectionWithAddressMixin(SelectionWithNoteSourceCitationMixin(SelectionAny)) {
    valueAsHappened() {
        return this.value().map(v => v ? (v === GedcomValue.Event.Yes ? true : null) : false);
    }

    getType() {
        return this.get(GedcomTag.Type);
    }

    getDate() {
        return this.get(GedcomTag.Date, null, SelectionDate);
    }

    getPlace() {
        return this.get(GedcomTag.Place, null, SelectionPlace);
    }

    getResponsibleAgency() {
        return this.get(GedcomTag.Agency);
    }

    getReligiousAffiliation() {
        return this.get(GedcomTag.Religion);
    }

    getCause() {
        return this.get(GedcomTag.Cause);
    }

    getMultimedia() {
        return this.get(GedcomTag.Object, null, SelectionMultimediaReference);
    }
}

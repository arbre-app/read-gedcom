import { SelectionDate } from './SelectionDate';
import { SelectionPlace } from './SelectionPlace';
import { SelectionNoteReferenceMixin } from './SelectionNoteReferenceMixin';
import { SelectionSourceCitation } from './SelectionSourceCitation';
import { SelectionMultimediaReference } from './SelectionMultimediaReference';
import { GedcomTag } from '../tag';
import { GedcomValue } from '../value';
import {SelectionAddressStructure} from "./SelectionAddressStructure";
import {SelectionWithNoteMixin} from "./mixin";

export class SelectionEvent extends SelectionWithNoteMixin(SelectionAddressStructure) {
    
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

    getSourceCitation() {
        return this.get(GedcomTag.Source, null, SelectionSourceCitation);
    }

    getMultimedia() {
        return this.get(GedcomTag.Object, null, SelectionMultimediaReference);
    }
}

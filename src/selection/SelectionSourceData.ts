import { SelectionEventsRecorded } from './SelectionEventsRecorded';
import { SelectionNoteReferenceMixin } from './SelectionNoteReferenceMixin';
import { GedcomTag } from '../tag';
import { GedcomSelection } from './GedcomSelection';
import {SelectionWithNoteMixin} from "./mixin";

export class SelectionSourceData extends SelectionWithNoteMixin(GedcomSelection) {
    
    getEventsRecorded() {
        return this.get(GedcomTag.Event, null, SelectionEventsRecorded);
    }

    getResponsibleAgency() {
        return this.get(GedcomTag.Agency);
    }
}

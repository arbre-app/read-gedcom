import { SelectionNoteReferenceMixin } from './SelectionNoteReferenceMixin';
import { GedcomTag } from '../tag';
import { GedcomSelection } from './GedcomSelection';
import {SelectionWithNoteMixin} from "./mixin";

export class SelectionSpouseFamilyLink extends SelectionWithNoteMixin(GedcomSelection) {
    
    getFamilyRecord() {
        return this.root().getFamilyRecord(this.valueNonNull());
    }
}

import { SelectionPhonetization } from './SelectionPhonetization';
import { SelectionRomanization } from './SelectionRomanization';
import { SelectionCoordinates } from './SelectionCoordinates';
import { SelectionNoteReferenceMixin } from './SelectionNoteReferenceMixin';
import { GedcomTag } from '../tag';
import { GedcomSelection } from './GedcomSelection';
import {SelectionWithNoteMixin} from "./mixin";

export class SelectionPlace extends SelectionWithNoteMixin(GedcomSelection) {
    
    getPhonetization() {
        return this.get(GedcomTag.Phonetic, null, SelectionPhonetization);
    }

    getRomanization() {
        return this.get(GedcomTag.Romanized, null, SelectionRomanization);
    }

    getCoordinates() {
        return this.get(GedcomTag.Map, null, SelectionCoordinates);
    }
}

import { SelectionSourceCitation } from './SelectionSourceCitation';
import { SelectionNoteReferenceMixin } from './SelectionNoteReferenceMixin';
import { GedcomTag } from '../tag';
import { GedcomSelection } from './GedcomSelection';
import {SelectionWithNoteMixin} from "./mixin";

export class SelectionAssociation extends SelectionWithNoteMixin(GedcomSelection) {
    
    getRelation() {
        return this.get(GedcomTag.Relationship);
    }

    getSourceCitation() {
        return this.get(GedcomTag.Source, null, SelectionSourceCitation);
    }
}

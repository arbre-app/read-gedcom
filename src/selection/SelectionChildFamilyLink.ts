import { SelectionPedigreeLinkageType } from './SelectionPedigreeLinkageType';
import { SelectionNoteReferenceMixin } from './SelectionNoteReferenceMixin';
import { GedcomTag } from '../tag';
import { GedcomSelection } from './GedcomSelection';
import {SelectionWithNoteMixin} from "./mixin";

export class SelectionChildFamilyLink extends SelectionWithNoteMixin(GedcomSelection) {
    
    getFamilyRecord() {
        return this.root().getFamilyRecord(this.valueNonNull());
    }

    getPedigreeLinkageType() {
        return this.get(GedcomTag.Pedigree, null, SelectionPedigreeLinkageType);
    }
}

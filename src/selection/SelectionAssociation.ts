import { SelectionSourceCitation } from './SelectionSourceCitation';
import { GedcomTag } from '../tag';
import { SelectionAny } from './Selection';
import {SelectionWithNoteMixin} from "./mixin";

export class SelectionAssociation extends SelectionWithNoteMixin(SelectionAny) {
    
    getRelation() {
        return this.get(GedcomTag.Relationship);
    }

    getSourceCitation() {
        return this.get(GedcomTag.Source, null, SelectionSourceCitation);
    }
}

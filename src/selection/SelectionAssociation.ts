import { SelectionWithNoteSourceCitationMixin } from './mixin';
import { GedcomTag } from '../tag';
import { SelectionAny } from './SelectionAny';

export class SelectionAssociation extends SelectionWithNoteSourceCitationMixin(SelectionAny) {
    getRelation() {
        return this.get(GedcomTag.Relationship);
    }
}

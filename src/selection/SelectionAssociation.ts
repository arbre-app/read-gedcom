import { SelectionWithNoteSourceCitationMixin } from './mixin';
import { Tag } from '../tag';
import { SelectionAny } from './internal';

export class SelectionAssociation extends SelectionWithNoteSourceCitationMixin(SelectionAny) {
    getRelation() {
        return this.get(Tag.Relationship);
    }
}

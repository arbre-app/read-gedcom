import { GedcomTag } from '../tag';
import { SelectionAny } from './SelectionAny';
import { SelectionWithNoteMixin } from './mixin';
import { SelectionDateExact } from './SelectionDateExact';

export class SelectionChanged extends SelectionWithNoteMixin(SelectionAny) {

    getDate() {
        return this.get(GedcomTag.Date, null, SelectionDateExact);
    }

}

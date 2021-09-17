import { SelectionPedigreeLinkageType, SelectionAny } from './internal';
import { Tag } from '../tag';

import { SelectionWithNoteMixin } from './mixin';

export class SelectionChildFamilyLink extends SelectionWithNoteMixin(SelectionAny) {
    getFamilyRecord() {
        return this.root().getFamilyRecord(this.valueNonNull());
    }

    getPedigreeLinkageType(): SelectionPedigreeLinkageType {
        return this.get(Tag.Pedigree);
    }
}

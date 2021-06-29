import { SelectionPedigreeLinkageType } from './SelectionPedigreeLinkageType';
import { GedcomTag } from '../tag';
import { SelectionAny } from './Selection';
import { SelectionWithNoteMixin } from './mixin';

export class SelectionChildFamilyLink extends SelectionWithNoteMixin(SelectionAny) {
    getFamilyRecord() {
        return this.root().getFamilyRecord(this.valueNonNull());
    }

    getPedigreeLinkageType() {
        return this.get(GedcomTag.Pedigree, null, SelectionPedigreeLinkageType);
    }
}

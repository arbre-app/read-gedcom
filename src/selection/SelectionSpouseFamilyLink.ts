import { SelectionAny } from './Selection';
import { SelectionWithNoteMixin } from './mixin';

export class SelectionSpouseFamilyLink extends SelectionWithNoteMixin(SelectionAny) {
    getFamilyRecord() {
        return this.root().getFamilyRecord(this.valueNonNull());
    }
}

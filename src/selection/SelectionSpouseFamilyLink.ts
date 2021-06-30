import { SelectionAny } from './SelectionAny';
import { SelectionWithNoteMixin } from './mixin';

export class SelectionSpouseFamilyLink extends SelectionWithNoteMixin(SelectionAny) {
    getFamilyRecord() {
        return this.root().getFamilyRecord(this.valueNonNull());
    }
}

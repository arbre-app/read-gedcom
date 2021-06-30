import { SelectionAny } from './SelectionAny';

export class SelectionNoteReferenceMixin extends SelectionAny {
    getNoteRecord() {
        return this.root().getNoteRecord(this.valueNonNull());
    }
}

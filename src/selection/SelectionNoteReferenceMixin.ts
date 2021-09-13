import { SelectionAny } from './internal';

export class SelectionNoteReferenceMixin extends SelectionAny {
    getNoteRecord() {
        return this.root().getNoteRecord(this.valueNonNull());
    }
}

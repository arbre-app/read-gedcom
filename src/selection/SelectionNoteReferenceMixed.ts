import { SelectionAny } from './internal';

export class SelectionNoteReferenceMixed extends SelectionAny {
    getNoteRecord() {
        return this.root().getNoteRecord(this.valueNonNull());
    }
}

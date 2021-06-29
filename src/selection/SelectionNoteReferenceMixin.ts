import { SelectionAny } from './Selection';

export class SelectionNoteReferenceMixin extends SelectionAny {
    getNoteRecord() {
        return this.root().getNoteRecord(this.valueNonNull());
    }
}

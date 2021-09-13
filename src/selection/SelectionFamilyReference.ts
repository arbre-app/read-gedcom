import { SelectionReference } from './internal';

export class SelectionFamilyReference extends SelectionReference {
    getFamilyRecord() {
        return this.root().getFamilyRecord(this.valueNonNull());
    }
}

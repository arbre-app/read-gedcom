import { SelectionReference } from './internal';

export class SelectionSubmitterReference extends SelectionReference {
    getSubmitterRecord() {
        return this.root().getSubmitterRecord(this.valueNonNull());
    }
}

import { SelectionReference } from './SelectionReference';

export class SelectionIndividualReference extends SelectionReference {
    getIndividualRecord() {
        return this.root().getIndividualRecord(this.valueNonNull());
    }
}

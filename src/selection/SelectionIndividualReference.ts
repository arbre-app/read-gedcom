import { SelectionReference } from './internal';

export class SelectionIndividualReference extends SelectionReference {
    getIndividualRecord() {
        return this.root().getIndividualRecord(this.valueNonNull());
    }
}

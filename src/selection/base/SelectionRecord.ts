import { Tag } from '../../tag';
import { SelectionAny, SelectionChanged, SelectionReferenceNumber } from '../internal';

export class SelectionRecord extends SelectionAny {
    getReferenceNumber() {
        return this.get(Tag.Reference, null, SelectionReferenceNumber);
    }

    getRecordIdentificationNumber() {
        return this.get(Tag.RecordIdNumber);
    }

    getChanged() {
        return this.get(Tag.Change, null, SelectionChanged);
    }
}

import { SelectionReferenceNumber } from './SelectionReferenceNumber';
import { SelectionChanged } from './SelectionChanged';
import { GedcomTag } from '../tag';
import { GedcomSelection } from './GedcomSelection';

export class SelectionRecord extends GedcomSelection {
    
    getReferenceNumber() {
        return this.get(GedcomTag.Reference, null, SelectionReferenceNumber);
    }

    getRecordIdentificationNumber() {
        return this.get(GedcomTag.RecordIdNumber);
    }

    getChanged() {
        return this.get(GedcomTag.Change, null, SelectionChanged);
    }
}

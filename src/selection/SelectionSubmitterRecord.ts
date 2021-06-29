import { GedcomTag } from '../tag';
import { SelectionRecord } from './SelectionRecord';

export class SelectionSubmitterRecord extends SelectionRecord {
    getName() {
        return this.get(GedcomTag.Name);
    }
}

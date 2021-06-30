import { GedcomTag } from '../tag';
import { SelectionRecord } from './base';

export class SelectionSubmitterRecord extends SelectionRecord {
    getName() {
        return this.get(GedcomTag.Name);
    }
}

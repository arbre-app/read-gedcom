import { SelectionSourceCitation } from './SelectionSourceCitation';
import { GedcomTag } from '../tag';
import { SelectionRecord } from './SelectionRecord';

export class SelectionNoteRecord extends SelectionRecord {
    getSourceCitation() {
        return this.get(GedcomTag.Source, null, SelectionSourceCitation);
    }
}

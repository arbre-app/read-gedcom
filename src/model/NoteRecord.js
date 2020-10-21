import { Tag } from '../tag';
import { Record } from './Record';
import { SourceCitation } from './SourceCitation';

export class NoteRecord extends Record {
    constructor(data, clazz) {
        super(data, clazz || NoteRecord);
    }

    getSourceCitation() {
        return this.get(Tag.SOURCE, SourceCitation);
    }
}

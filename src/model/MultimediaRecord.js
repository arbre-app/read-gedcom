import { Tag } from '../tag';
import { MultimediaFile } from './MultimediaFile';
import { NoteReferenceMixin } from './NoteReferenceMixin';
import { Record } from './Record';
import { SourceCitation } from './SourceCitation';

export class MultimediaRecord extends Record {
    constructor(data, clazz) {
        super(data, clazz || MultimediaRecord);
    }

    getFileReference(q) {
        return this.get(Tag.FILE, q, MultimediaFile);
    }

    getNote(q) {
        return this.get(Tag.NOTE, q, NoteReferenceMixin);
    }

    getSourceCitation(q) {
        return this.get(Tag.SOURCE, q, SourceCitation);
    }
}

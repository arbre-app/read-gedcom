import { Tag } from '../tag';
import { MultimediaFile } from './MultimediaFile';
import { NoteReferenceMixin } from './NoteReferenceMixin';
import { Record } from './Record';
import { SourceCitation } from './SourceCitation';

export class MultimediaRecord extends Record {
    constructor(data, clazz) {
        super(data, clazz || MultimediaRecord);
    }

    getFileReference() {
        return this.get(Tag.FILE, MultimediaFile);
    }

    getNote() {
        return this.get(Tag.NOTE, NoteReferenceMixin);
    }

    getSourceCitation() {
        return this.get(Tag.SOURCE, SourceCitation);
    }
}

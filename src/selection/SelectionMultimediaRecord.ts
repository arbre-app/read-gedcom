import { SelectionWithNoteSourceCitationMixin } from './mixin';
import { SelectionMultimediaFile } from './internal';
import { Tag } from '../tag';
import { SelectionRecord } from './base';

export class SelectionMultimediaRecord extends SelectionWithNoteSourceCitationMixin(SelectionRecord) {
    getFileReference() {
        return this.get(Tag.File, null, SelectionMultimediaFile);
    }
}

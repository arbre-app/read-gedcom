import { SelectionWithNoteSourceCitationMixin } from './mixin';
import { SelectionMultimediaFile } from './SelectionMultimediaFile';
import { GedcomTag } from '../tag';
import { SelectionRecord } from './base';

export class SelectionMultimediaRecord extends SelectionWithNoteSourceCitationMixin(SelectionRecord) {
    getFileReference() {
        return this.get(GedcomTag.File, null, SelectionMultimediaFile);
    }
}

import { SelectionMultimediaFile } from './SelectionMultimediaFile';
import { SelectionSourceCitation } from './SelectionSourceCitation';
import { GedcomTag } from '../tag';
import { SelectionRecord } from './SelectionRecord';
import { SelectionWithNoteMixin } from './mixin';

export class SelectionMultimediaRecord extends SelectionWithNoteMixin(SelectionRecord) {
    getFileReference() {
        return this.get(GedcomTag.File, null, SelectionMultimediaFile);
    }

    getSourceCitation() {
        return this.get(GedcomTag.Source, null, SelectionSourceCitation);
    }
}

import { SelectionMultimediaFormat } from './SelectionMultimediaFormat';
import { GedcomTag } from '../tag';
import { SelectionAny } from './Selection';

export class SelectionMultimediaFile extends SelectionAny {
    getFormat() {
        return this.get(GedcomTag.Format, null, SelectionMultimediaFormat);
    }

    getTitle() {
        return this.get(GedcomTag.Title);
    }
}

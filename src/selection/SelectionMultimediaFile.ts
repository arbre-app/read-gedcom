import { SelectionMultimediaFormat, SelectionAny } from './internal';
import { Tag } from '../tag';

export class SelectionMultimediaFile extends SelectionAny {
    getFormat() {
        return this.get(Tag.Format, null, SelectionMultimediaFormat);
    }

    getTitle() {
        return this.get(Tag.Title);
    }
}

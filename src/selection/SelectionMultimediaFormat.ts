import { SelectionMediaType, SelectionAny } from './internal';
import { Tag } from '../tag';

export class SelectionMultimediaFormat extends SelectionAny {
    getMediaType() {
        return this.get(Tag.Type, null, SelectionMediaType);
    }
}

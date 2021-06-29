import { SelectionMediaType } from './SelectionMediaType';
import { GedcomTag } from '../tag';
import { SelectionAny } from './Selection';

export class SelectionMultimediaFormat extends SelectionAny {
    getMediaType() {
        return this.get(GedcomTag.Type, null, SelectionMediaType);
    }
}

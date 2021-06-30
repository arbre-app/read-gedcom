import { SelectionMediaType } from './SelectionMediaType';
import { GedcomTag } from '../tag';
import { SelectionAny } from './SelectionAny';

export class SelectionMultimediaFormat extends SelectionAny {
    getMediaType() {
        return this.get(GedcomTag.Type, null, SelectionMediaType);
    }
}

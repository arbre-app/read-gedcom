import { SelectionMediaType } from './SelectionMediaType';
import { GedcomTag } from '../tag';
import { GedcomSelection } from './GedcomSelection';

export class SelectionMultimediaFormat extends GedcomSelection {

    getMediaType() {
        return this.get(GedcomTag.Type, null, SelectionMediaType);
    }
}

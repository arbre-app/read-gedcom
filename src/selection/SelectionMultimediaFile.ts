import { SelectionMultimediaFormat } from './SelectionMultimediaFormat';
import { GedcomTag } from '../tag';
import { GedcomSelection } from './GedcomSelection';

export class SelectionMultimediaFile extends GedcomSelection {
    
    getFormat() {
        return this.get(GedcomTag.Format, null, SelectionMultimediaFormat);
    }

    getTitle() {
        return this.get(GedcomTag.Title);
    }
}

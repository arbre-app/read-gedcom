import { SelectionSourceData } from './SelectionSourceData';
import { SelectionRepositoryReference } from './SelectionRepositoryReference';
import { SelectionMultimediaReference } from './SelectionMultimediaReference';
import { GedcomTag } from '../tag';
import { SelectionRecord } from './SelectionRecord';
import { SelectionWithNoteMixin } from './mixin';

export class SelectionSourceRecord extends SelectionWithNoteMixin(SelectionRecord) {
    getData() {
        return this.get(GedcomTag.Data, null, SelectionSourceData);
    }

    getOriginator() {
        return this.get(GedcomTag.Author);
    }

    getDescriptiveTitle() {
        return this.get(GedcomTag.Title);
    }

    getShortTitle() {
        return this.get(GedcomTag.Abbreviation);
    }

    getPublicationFacts() {
        return this.get(GedcomTag.Publication);
    }

    getText() {
        return this.get(GedcomTag.Text);
    }

    getRepository() {
        return this.get(GedcomTag.Repository, null, SelectionRepositoryReference);
    }

    getMultimedia() {
        return this.get(GedcomTag.Object, null, SelectionMultimediaReference);
    }
}

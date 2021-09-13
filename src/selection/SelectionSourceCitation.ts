import { SelectionCitationEvent, SelectionCitationData, SelectionMultimediaReference, SelectionSourceCertainty, SelectionAny } from './internal';

import { Tag } from '../tag';

import { SelectionWithNoteMixin } from './mixin';

export class SelectionSourceCitation extends SelectionWithNoteMixin(SelectionAny) {
    getSourceRecord() {
        return this.root().getSourceRecord(this.valueNonNull());
    }

    getLocationInSource() {
        return this.get(Tag.Page);
    }

    getEventCitedFrom() {
        return this.get(Tag.Event, null, SelectionCitationEvent);
    }

    getData() {
        return this.get(Tag.Data, null, SelectionCitationData);
    }

    getMultimedia() {
        return this.get(Tag.Object, null, SelectionMultimediaReference);
    }

    getCertainty() {
        return this.get(Tag.QualityOfData, null, SelectionSourceCertainty);
    }
}

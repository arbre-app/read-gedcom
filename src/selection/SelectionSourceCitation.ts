import { SelectionCitationEvent } from './SelectionCitationEvent';
import { SelectionCitationData } from './SelectionCitationData';
import { SelectionMultimediaReference } from './SelectionMultimediaReference';
import { SelectionSourceCertainty } from './SelectionSourceCertainty';
import { GedcomTag } from '../tag';
import { SelectionAny } from './Selection';
import {SelectionWithNoteMixin} from "./mixin";

export class SelectionSourceCitation extends SelectionWithNoteMixin(SelectionAny) {
    
    getSourceRecord() {
        return this.root().getSourceRecord(this.valueNonNull());
    }

    getLocationInSource() {
        return this.get(GedcomTag.Page);
    }

    getEventCitedFrom() {
        return this.get(GedcomTag.Event, null, SelectionCitationEvent);
    }

    getData() {
        return this.get(GedcomTag.Data, null, SelectionCitationData);
    }

    getMultimedia() {
        return this.get(GedcomTag.Object, null, SelectionMultimediaReference);
    }

    getCertainty() {
        return this.get(GedcomTag.QualityOfData, null, SelectionSourceCertainty);
    }
}

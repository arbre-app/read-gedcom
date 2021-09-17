import {
    SelectionCitationEvent,
    SelectionCitationData,
    SelectionSourceCertainty,
    SelectionAny,
    SelectionWithMultimediaMixin,
} from './internal';

import { Tag } from '../tag';

import { SelectionWithNoteMixin } from './mixin';

export class SelectionSourceCitation extends SelectionWithMultimediaMixin(SelectionWithNoteMixin(SelectionAny)) {
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

    getCertainty(): SelectionSourceCertainty {
        return this.get(Tag.QualityOfData);
    }
}

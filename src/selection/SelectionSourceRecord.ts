import {
    SelectionSourceData,
    SelectionRepositoryReference,
    SelectionWithMultimediaMixin,
} from './internal';

import { Tag } from '../tag';
import { SelectionRecord } from './base';
import { SelectionWithNoteMixin } from './mixin';

export class SelectionSourceRecord extends SelectionWithMultimediaMixin(SelectionWithNoteMixin(SelectionRecord)) {
    getData() {
        return this.get(Tag.Data, null, SelectionSourceData);
    }

    getOriginator() {
        return this.get(Tag.Author);
    }

    getDescriptiveTitle() {
        return this.get(Tag.Title);
    }

    getShortTitle() {
        return this.get(Tag.Abbreviation);
    }

    getPublicationFacts() {
        return this.get(Tag.Publication);
    }

    getText() {
        return this.get(Tag.Text);
    }

    getRepository() {
        return this.get(Tag.Repository, null, SelectionRepositoryReference);
    }
}

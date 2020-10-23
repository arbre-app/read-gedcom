import { Tag } from '../tag';
import { MetaEvent } from './MetaEvent';

export class CitationEvent extends MetaEvent {
    constructor(data, clazz) {
        super(data, clazz || CitationEvent);
    }

    getRole() {
        return this.get(Tag.ROLE);
    }
}

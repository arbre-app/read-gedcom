import { Tag } from '../tag';
import { MetaEvent } from './MetaEvent';

export class CitationEvent extends MetaEvent {
    constructor(data, clazz) {
        super(data, clazz || CitationEvent);
    }

    getRole(q) {
        return this.get(Tag.ROLE, q);
    }
}

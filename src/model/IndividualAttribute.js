import { Tag } from '../tag';
import { IndividualEvent } from './IndividualEvent';

export class IndividualAttribute extends IndividualEvent {
    constructor(data) {
        super(data, IndividualAttribute);
    }

    getType() {
        return this.getByTag(Tag.TYPE);
    }
}

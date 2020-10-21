import { Tag } from '../tag';
import { IndividualEvent } from './IndividualEvent';

export class IndividualAttribute extends IndividualEvent {
    constructor(data, clazz) {
        super(data, clazz || IndividualAttribute);
    }

    getType() {
        return this.get(Tag.TYPE);
    }
}

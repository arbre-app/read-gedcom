import { Event } from './Event';
import { Tag } from '../tag';
import { SpouseEventDetails } from './SpouseEventDetails';

export class FamilyEvent extends Event {
    constructor(data, clazz) {
        super(data, clazz || FamilyEvent);
    }

    getHusbandDetails(q) {
        return this.get(Tag.HUSBAND, q, SpouseEventDetails);
    }

    getWifeDetails(q) {
        return this.get(Tag.WIFE, q, SpouseEventDetails);
    }
}

import { Event } from './Event';
import { Tag } from '../tag';
import { SpouseEventDetails } from './SpouseEventDetails';

export class FamilyEvent extends Event {
    constructor(data, clazz) {
        super(data, clazz || FamilyEvent);
    }

    getHusbandDetails() {
        return this.get(Tag.HUSBAND, SpouseEventDetails);
    }

    getWifeDetails() {
        return this.get(Tag.WIFE, SpouseEventDetails);
    }
}

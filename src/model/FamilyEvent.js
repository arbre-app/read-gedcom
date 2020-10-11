import { Event } from './Event';
import { Tag } from '../tag';
import { SpouseEventDetails } from './SpouseEventDetails';

export class FamilyEvent extends Event {
    constructor(data) {
        super(data, FamilyEvent);
    }

    getHusbandDetails() {
        return this.getByTag(Tag.HUSBAND, SpouseEventDetails);
    }

    getWifeDetails() {
        return this.getByTag(Tag.WIFE, SpouseEventDetails);
    }
}

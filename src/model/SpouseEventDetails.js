import { Node } from './Node';
import { Tag } from '../tag';

export class SpouseEventDetails extends Node {
    constructor(data) {
        super(data, SpouseEventDetails);
    }

    getAge() {
        return this.getByTag(Tag.AGE);
    }
}

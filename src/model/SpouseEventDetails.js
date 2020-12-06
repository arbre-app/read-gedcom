import { Node } from './Node';
import { Tag } from '../tag';

export class SpouseEventDetails extends Node {
    constructor(data, clazz) {
        super(data, clazz || SpouseEventDetails);
    }

    getAge(q) {
        return this.get(Tag.AGE, q);
    }
}

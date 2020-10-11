import { Node } from './Node';
import { Tag } from '../tag';
import { RomanisationMethod } from './RomanisationMethod';

export class Romanisation extends Node {
    constructor(data) {
        super(data, Romanisation);
    }

    getMethod() {
        return this.getByTag(Tag.TYPE, RomanisationMethod);
    }
}

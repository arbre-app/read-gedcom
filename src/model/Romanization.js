import { Node } from './Node';
import { Tag } from '../tag';
import { RomanizationMethod } from './RomanizationMethod';

export class Romanization extends Node {
    constructor(data) {
        super(data, Romanization);
    }

    getMethod() {
        return this.getByTag(Tag.TYPE, RomanizationMethod);
    }
}

import { Node } from './Node';
import { Tag } from '../tag';
import { RomanizationMethod } from './RomanizationMethod';

export class Romanization extends Node {
    constructor(data, clazz) {
        super(data, clazz || Romanization);
    }

    getMethod() {
        return this.get(Tag.TYPE, RomanizationMethod);
    }
}

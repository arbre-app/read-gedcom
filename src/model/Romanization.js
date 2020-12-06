import { Node } from './Node';
import { Tag } from '../tag';
import { RomanizationMethod } from './RomanizationMethod';

export class Romanization extends Node {
    constructor(data, clazz) {
        super(data, clazz || Romanization);
    }

    getMethod(q) {
        return this.get(Tag.TYPE, q, RomanizationMethod);
    }
}

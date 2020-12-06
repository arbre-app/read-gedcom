import { Node } from './Node';
import { Tag } from '../tag';
import { PhonetizationMethod } from './PhonetizationMethod';

export class Phonetization extends Node {
    constructor(data, clazz) {
        super(data, clazz || Phonetization);
    }

    getMethod(q) {
        return this.get(Tag.TYPE, q, PhonetizationMethod);
    }
}

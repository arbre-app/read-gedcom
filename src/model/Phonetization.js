import { Node } from './Node';
import { Tag } from '../tag';
import { PhonetizationMethod } from './PhonetizationMethod';

export class Phonetization extends Node {
    constructor(data, clazz) {
        super(data, clazz || Phonetization);
    }

    getMethod() {
        return this.get(Tag.TYPE, PhonetizationMethod);
    }
}

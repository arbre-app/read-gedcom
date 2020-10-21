import { Node } from './Node';
import { Tag } from '../tag';
import { PhonetizationMethod } from './PhonetizationMethod';

export class Phonetization extends Node {
    constructor(data) {
        super(data, Phonetization);
    }

    getMethod() {
        return this.getByTag(Tag.TYPE, PhonetizationMethod);
    }
}

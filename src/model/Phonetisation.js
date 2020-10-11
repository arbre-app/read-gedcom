import { Node } from './Node';
import { Tag } from '../tag';
import { PhonetisationMethod } from './PhonetisationMethod';

export class Phonetisation extends Node {
    constructor(data) {
        super(data, Phonetisation);
    }

    getMethod() {
        return this.getByTag(Tag.TYPE, PhonetisationMethod);
    }
}

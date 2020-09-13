import { Node } from './Node';
import { Address } from './Address';
import { Tag } from '../parse';

export class GedcomSource extends Node {
    constructor(data) {
        super(data, GedcomSource);
    }

    getVersion() {
        return this.getByTag(Tag.VERSION_NUMBER);
    }

    getName() {
        return this.getByTag(Tag.NAME);
    }

    getCorporation() {
        return this.getByTag(Tag.CORPORATION, Address);
    }


}

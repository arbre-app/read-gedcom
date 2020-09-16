import { Node } from './Node';
import { Address } from './Address';
import { Tag } from '../tag';
import { AddressStructure } from './AddressStructure';

export class Corporation extends AddressStructure {
    constructor(data) {
        super(data, Corporation);
    }

    getAddress() {
        return this.getByTag(Tag.ADDRESS, Address);
    }
}

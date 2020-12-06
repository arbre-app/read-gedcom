import { Node } from './Node';
import { Address } from './Address';
import { Tag } from '../tag';
import { AddressStructure } from './AddressStructure';

export class Corporation extends AddressStructure {
    constructor(data, clazz) {
        super(data, clazz || Corporation);
    }

    getAddress(q) {
        return this.get(Tag.ADDRESS, q, Address);
    }
}

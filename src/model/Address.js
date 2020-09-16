import { Node } from './Node';
import { Tag } from '../tag';

export class Address extends Node {
    constructor(data) {
        super(data, Address);
    }

    getAddressLine1() {
        return this.getByTag(Tag.ADDRESS_1);
    }

    getAddressLine2() {
        return this.getByTag(Tag.ADDRESS_2);
    }

    getAddressLine3() {
        return this.getByTag(Tag.ADDRESS_3);
    }

    getCity() {
        return this.getByTag(Tag.CITY);
    }

    getState() {
        return this.getByTag(Tag.STATE);
    }

    getPostalCode() {
        return this.getByTag(Tag.POSTAL_CODE);
    }

    getCountry() {
        return this.getByTag(Tag.COUNTRY);
    }
}

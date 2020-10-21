import { Node } from './Node';
import { Tag } from '../tag';

export class Address extends Node {
    constructor(data, clazz) {
        super(data, clazz || Address);
    }

    getAddressLine1() {
        return this.get(Tag.ADDRESS_1);
    }

    getAddressLine2() {
        return this.get(Tag.ADDRESS_2);
    }

    getAddressLine3() {
        return this.get(Tag.ADDRESS_3);
    }

    getCity() {
        return this.get(Tag.CITY);
    }

    getState() {
        return this.get(Tag.STATE);
    }

    getPostalCode() {
        return this.get(Tag.POSTAL_CODE);
    }

    getCountry() {
        return this.get(Tag.COUNTRY);
    }
}

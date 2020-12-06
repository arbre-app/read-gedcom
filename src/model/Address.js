import { Node } from './Node';
import { Tag } from '../tag';

export class Address extends Node {
    constructor(data, clazz) {
        super(data, clazz || Address);
    }

    getAddressLine1(q) {
        return this.get(Tag.ADDRESS_1, q);
    }

    getAddressLine2(q) {
        return this.get(Tag.ADDRESS_2, q);
    }

    getAddressLine3(q) {
        return this.get(Tag.ADDRESS_3, q);
    }

    getCity(q) {
        return this.get(Tag.CITY, q);
    }

    getState(q) {
        return this.get(Tag.STATE, q);
    }

    getPostalCode(q) {
        return this.get(Tag.POSTAL_CODE, q);
    }

    getCountry(q) {
        return this.get(Tag.COUNTRY, q);
    }
}

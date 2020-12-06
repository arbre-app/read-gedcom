import { Node } from './Node';
import { Tag } from "../tag";
import { Address } from './Address';

export class AddressStructure extends Node {
    constructor(data, clazz) {
        super(data, clazz || AddressStructure);
    }

    getAddress(q) {
        return this.get(Tag.ADDRESS, q, Address);
    }

    getPhoneNumber(q) {
        return this.get(Tag.PHONE, q);
    }

    getEmailAddress() {
        return this.get(Tag.EMAIL, q);
    }

    getFaxAddress(q) {
        return this.get(Tag.FAX, q);
    }

    getWebAddress(q) {
        return this.get(Tag.WEB, q);
    }
}

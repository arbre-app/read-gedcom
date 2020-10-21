import { Node } from './Node';
import { Tag } from "../tag";
import { Address } from './Address';

export class AddressStructure extends Node {
    constructor(data, clazz) {
        super(data, clazz || AddressStructure);
    }

    getAddress() {
        return this.get(Tag.ADDRESS, Address);
    }

    getPhoneNumber() {
        return this.get(Tag.PHONE);
    }

    getEmailAddress() {
        return this.get(Tag.EMAIL);
    }

    getFaxAddress() {
        return this.get(Tag.FAX);
    }

    getWebAddress() {
        return this.get(Tag.WEB);
    }
}

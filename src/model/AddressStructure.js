import { Node } from './Node';
import { Tag } from "../tag";
import { Address } from './Address';

export class AddressStructure extends Node {
    constructor(data) {
        super(data, AddressStructure);
    }

    getAddress() {
        return this.getByTag(Tag.ADDRESS, Address);
    }

    getPhoneNumber() {
        return this.getByTag(Tag.PHONE_NUMBER);
    }

    getEmailAddress() {
        return this.getByTag(Tag.EMAIL_ADDRESS);
    }

    getFaxAddress() {
        return this.getByTag(Tag.FAX_ADDRESS);
    }

    getWebAddress() {
        return this.getByTag(Tag.WEB_ADDRESS);
    }
}

import { Tag } from '../tag';
import { Address } from './Address';
import { NoteReferenceMixin } from './NoteReferenceMixin';
import { Record } from './Record';

export class RepositoryRecord extends Record {
    constructor(data, clazz) {
        super(data, clazz || RepositoryRecord);
    }

    getName(q) {
        return this.get(Tag.NAME, q);
    }

    // Address structure borrowed from AddressStructure

    getAddress(q) {
        return this.get(Tag.ADDRESS, q, Address);
    }

    getPhoneNumber(q) {
        return this.get(Tag.PHONE, q);
    }

    getEmailAddress(q) {
        return this.get(Tag.EMAIL, q);
    }

    getFaxAddress(q) {
        return this.get(Tag.FAX, q);
    }

    getWebAddress(q) {
        return this.get(Tag.WEB, q);
    }

    getNote() {
        return this.get(Tag.NOTE, q, NoteReferenceMixin);
    }
}

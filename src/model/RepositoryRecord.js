import { Tag } from '../tag';
import { Address } from './Address';
import { NoteReferenceMixin } from './NoteReferenceMixin';
import { Record } from './Record';

export class RepositoryRecord extends Record {
    constructor(data, clazz) {
        super(data, clazz || RepositoryRecord);
    }

    getName() {
        return this.get(Tag.NAME);
    }

    // Address structure borrowed from AddressStructure

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

    getNote() {
        return this.get(Tag.NOTE, NoteReferenceMixin);
    }
}

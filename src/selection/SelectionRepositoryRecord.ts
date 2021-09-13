import { SelectionAddress } from './internal';
import { Tag } from '../tag';
import { SelectionRecord } from './base';
import { SelectionWithNoteMixin } from './mixin';

export class SelectionRepositoryRecord extends SelectionWithNoteMixin(SelectionRecord) {
    getName() {
        return this.get(Tag.Name);
    }

    // Address structure borrowed from AddressStructure

    getAddress() {
        return this.get(Tag.Address, null, SelectionAddress);
    }

    getPhoneNumber() {
        return this.get(Tag.Phone);
    }

    getEmailAddress() {
        return this.get(Tag.Email);
    }

    getFaxAddress() {
        return this.get(Tag.Fax);
    }

    getWebAddress() {
        return this.get(Tag.Web);
    }
}

import { SelectionAddress } from './SelectionAddress';
import { GedcomTag } from '../tag';
import {SelectionRecord} from "./SelectionRecord";
import {SelectionWithNoteMixin} from "./mixin";

export class SelectionRepositoryRecord extends SelectionWithNoteMixin(SelectionRecord) {
    
    getName() {
        return this.get(GedcomTag.Name);
    }

    // Address structure borrowed from AddressStructure

    getAddress() {
        return this.get(GedcomTag.Address, null, SelectionAddress);
    }

    getPhoneNumber() {
        return this.get(GedcomTag.Phone);
    }

    getEmailAddress() {
        return this.get(GedcomTag.Email);
    }

    getFaxAddress() {
        return this.get(GedcomTag.Fax);
    }

    getWebAddress() {
        return this.get(GedcomTag.Web);
    }
}

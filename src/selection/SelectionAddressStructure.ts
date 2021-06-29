import { SelectionAddress } from './SelectionAddress';
import { GedcomTag } from '../tag';
import { SelectionAny } from './Selection';

export class SelectionAddressStructure extends SelectionAny {
    
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

import { SelectionAddress } from './SelectionAddress';
import { GedcomTag } from '../tag';
import { GedcomSelection } from './GedcomSelection';

export class SelectionAddressStructure extends GedcomSelection {
    
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

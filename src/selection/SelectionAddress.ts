import { GedcomTag } from '../tag';
import { GedcomSelection } from './GedcomSelection';

export class SelectionAddress extends GedcomSelection {

    getAddressLine1() {
        return this.get(GedcomTag.Address1);
    }

    getAddressLine2() {
        return this.get(GedcomTag.Address2);
    }

    getAddressLine3() {
        return this.get(GedcomTag.Address3);
    }

    getCity() {
        return this.get(GedcomTag.City);
    }

    getState() {
        return this.get(GedcomTag.State);
    }

    getPostalCode() {
        return this.get(GedcomTag.PostalCode);
    }

    getCountry() {
        return this.get(GedcomTag.Country);
    }
}

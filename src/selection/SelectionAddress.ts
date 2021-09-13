import { Tag } from '../tag';
import { SelectionAny } from './internal';

export class SelectionAddress extends SelectionAny {
    getAddressLine1() {
        return this.get(Tag.Address1);
    }

    getAddressLine2() {
        return this.get(Tag.Address2);
    }

    getAddressLine3() {
        return this.get(Tag.Address3);
    }

    getCity() {
        return this.get(Tag.City);
    }

    getState() {
        return this.get(Tag.State);
    }

    getPostalCode() {
        return this.get(Tag.PostalCode);
    }

    getCountry() {
        return this.get(Tag.Country);
    }
}

import { AnyConstructor } from '../../meta';
import { SelectionAddress, SelectionAny } from '../internal';

import { Tag } from '../../tag';

/**
 * @ignore
 */
export const SelectionWithAddressMixin = <C extends AnyConstructor<SelectionAny>>(Base: C): C & AnyConstructor<SelectionWithAddressMixin> =>
    class extends Base implements SelectionWithAddressMixin {
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
    };

export interface SelectionWithAddressMixin {
    getAddress(): SelectionAddress;
    getPhoneNumber(): SelectionAny;
    getEmailAddress(): SelectionAny;
    getFaxAddress(): SelectionAny;
    getWebAddress(): SelectionAny;
}

import { AnyConstructor, Mixin } from '../../meta';
import { SelectionAddress, SelectionAny } from '../internal';

import { Tag } from '../../tag';

/**
 * @ignore
 */
export const SelectionWithAddressMixin = <C extends AnyConstructor<SelectionAny>>(Base: C) =>
    class extends Base {
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

export type SelectionWithAddressMixin = Mixin<typeof SelectionWithAddressMixin>

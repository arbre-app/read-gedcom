import { AnyConstructor, Mixin } from '../../meta';
import { SelectionAddress } from '../SelectionAddress';
import { SelectionAny } from '../SelectionAny';
import { GedcomTag } from '../../tag';

/**
 * @ignore
 */
export const SelectionWithAddressMixin = <C extends AnyConstructor<SelectionAny>>(Base: C) =>
    class extends Base {
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
    };

export type SelectionWithAddressMixin = Mixin<typeof SelectionWithAddressMixin>

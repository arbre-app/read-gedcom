import { AnyConstructor, Mixin } from '../../meta';
import { SelectionAny, SelectionSourceCitation } from '../internal';
import { Tag } from '../../tag';

/**
 * @ignore
 */
export const SelectionWithSourceCitationMixin = <C extends AnyConstructor<SelectionAny>>(Base: C) =>
    class extends Base {
        /**
         * Source citations related to this entity.
         * <table>
         *  <tr><th>Tag</th><td><code>SOUR</code></td></tr>
         *  <tr><th>Multiplicity</th><td><code>*</code></td></tr>
         * </table>
         */
        getSourceCitation() {
            return this.get(Tag.Source, null, SelectionSourceCitation);
        }
    };

export type SelectionWithSourceCitationMixin = Mixin<typeof SelectionWithSourceCitationMixin>

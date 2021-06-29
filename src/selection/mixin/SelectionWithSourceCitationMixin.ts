import {AnyConstructor, Mixin} from "../../meta";
import {SelectionAny} from "../Selection";
import {GedcomTag} from "../../tag";
import {SelectionSourceCitation} from "../SelectionSourceCitation";

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
            return this.get(GedcomTag.Source, null, SelectionSourceCitation);
        }
    };

export type SelectionWithSourceCitationMixin = Mixin<typeof SelectionWithSourceCitationMixin>

import {AnyConstructor, Mixin} from "../../meta";
import {GedcomSelection} from "../GedcomSelection";
import {GedcomTag} from "../../tag";
import {SelectionNoteReferenceMixin} from "../SelectionNoteReferenceMixin";

/**
 * @ignore
 */
export const SelectionWithNoteMixin = <C extends AnyConstructor<GedcomSelection>>(Base: C) =>
    class extends Base {
        /**
         * The note(s) associated to this attribute.
         * <table>
         *  <tr><th>Tag</th><td><code>NOTE</code></td></tr>
         *  <tr><th>Multiplicity</th><td><code>*</code></td></tr>
         * </table>
         */
        getNote(): GedcomSelection {
            return this.get(GedcomTag.Note, null, SelectionNoteReferenceMixin);
        }
    };

export type SelectionWithNoteMixin = Mixin<typeof SelectionWithNoteMixin>

import { AnyConstructor, Mixin } from '../../meta';
import { SelectionAny, SelectionNoteReferenceMixed } from '../internal';
import { Tag } from '../../tag';

/**
 * @ignore
 */
export const SelectionWithNoteMixin = <C extends AnyConstructor<SelectionAny>>(Base: C) =>
    class extends Base {
        /**
         * The note(s) associated to this attribute.
         * <table>
         *  <tr><th>Tag</th><td><code>NOTE</code></td></tr>
         *  <tr><th>Multiplicity</th><td><code>*</code></td></tr>
         * </table>
         */
        getNote() {
            return this.get(Tag.Note, null, SelectionNoteReferenceMixed);
        }
    };

export type SelectionWithNoteMixin = Mixin<typeof SelectionWithNoteMixin>

import { AnyConstructor, Mixin } from '../../meta';
import { SelectionAny, SelectionNoteReferenceMixin } from '../internal';
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
        getNote(): SelectionAny {
            return this.get(Tag.Note, null, SelectionNoteReferenceMixin);
        }
    };

export type SelectionWithNoteMixin = Mixin<typeof SelectionWithNoteMixin>

import { AnyConstructor, Mixin } from '../../meta';
import { SelectionAny } from '../SelectionAny';
import { SelectionWithNoteMixin } from './SelectionWithNoteMixin';
import { SelectionWithSourceCitationMixin } from './SelectionWithSourceCitationMixin';

/**
 * @ignore
 */
export const SelectionWithNoteSourceCitationMixin = <C extends AnyConstructor<SelectionAny>>(Base: C) => SelectionWithSourceCitationMixin(SelectionWithNoteMixin(Base));

export type SelectionWithNoteSourceCitationMixin = Mixin<typeof SelectionWithNoteSourceCitationMixin>

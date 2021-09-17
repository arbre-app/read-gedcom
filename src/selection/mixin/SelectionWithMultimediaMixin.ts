import { AnyConstructor, Mixin } from '../../meta';
import { SelectionAny, SelectionMultimediaReference } from '../internal';
import { Tag } from '../../tag';

/**
 * @ignore
 */
export const SelectionWithMultimediaMixin = <C extends AnyConstructor<SelectionAny>>(Base: C) =>
    class extends Base {
        getMultimedia() {
            return this.get(Tag.Object, null, SelectionMultimediaReference);
        }
    };

export type SelectionWithMultimediaMixin = Mixin<typeof SelectionWithMultimediaMixin>

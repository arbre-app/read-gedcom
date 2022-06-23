import { AnyConstructor } from '../../meta';
import { SelectionAny, SelectionMultimediaReference } from '../internal';
import { Tag } from '../../tag';

/**
 * @ignore
 */
export const SelectionWithMultimediaMixin = <C extends AnyConstructor<SelectionAny>>(Base: C): C & AnyConstructor<SelectionWithMultimediaMixin> =>
    class extends Base implements SelectionWithMultimediaMixin {
        getMultimedia() {
            return this.get(Tag.Object, null, SelectionMultimediaReference);
        }
    };

export interface SelectionWithMultimediaMixin {
    getMultimedia(): SelectionMultimediaReference;
}

import { Tag } from '../tag';
import { SelectionAny } from './internal';

export class SelectionGedcomForm extends SelectionAny {
    getVersion() {
        return this.get(Tag.Version);
    }

    getName() {
        return this.get(Tag.Name);
    }
}

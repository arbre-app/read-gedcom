import { SelectionGedcomVersion, SelectionGedcomForm, SelectionAny } from './internal';

import { Tag } from '../tag';

export class SelectionGedcomFile extends SelectionAny {
    getVersion() {
        return this.get(Tag.Version, null, SelectionGedcomVersion);
    }

    getGedcomForm() {
        return this.get(Tag.Format, null, SelectionGedcomForm);
    }
}

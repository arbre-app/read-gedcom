import { SelectionCorporation, SelectionDataSource, SelectionAny } from './internal';

import { Tag } from '../tag';

export class SelectionGedcomSource extends SelectionAny {
    getVersion() {
        return this.get(Tag.Version);
    }

    getName() {
        return this.get(Tag.Name);
    }

    getCorporation() {
        return this.get(Tag.Corporate, null, SelectionCorporation);
    }

    getDataSource() {
        return this.get(Tag.Data, null, SelectionDataSource);
    }
}

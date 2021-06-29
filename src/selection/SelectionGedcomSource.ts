import { SelectionCorporation } from './SelectionCorporation';
import { SelectionDataSource } from './SelectionDataSource';
import { GedcomTag } from '../tag';
import { SelectionAny } from './Selection';

export class SelectionGedcomSource extends SelectionAny {
    
    getVersion() {
        return this.get(GedcomTag.Version);
    }

    getName() {
        return this.get(GedcomTag.Name);
    }

    getCorporation() {
        return this.get(GedcomTag.Corporate, null, SelectionCorporation);
    }

    getDataSource() {
        return this.get(GedcomTag.Data, null, SelectionDataSource);
    }
}

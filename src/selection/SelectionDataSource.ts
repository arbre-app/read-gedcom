import { SelectionDate } from './SelectionDate';
import { GedcomTag } from '../tag';
import { SelectionAny } from './Selection';

export class SelectionDataSource extends SelectionAny {
    
    getDate() {
        return this.get(GedcomTag.Date, null, SelectionDate);
    }

    getCopyright() {
        return this.get(GedcomTag.Copyright);
    }
}

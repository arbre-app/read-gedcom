import { SelectionDate } from './SelectionDate';
import { GedcomTag } from '../tag';
import { GedcomSelection } from './GedcomSelection';

export class SelectionDataSource extends GedcomSelection {
    
    getDate() {
        return this.get(GedcomTag.Date, null, SelectionDate);
    }

    getCopyright() {
        return this.get(GedcomTag.Copyright);
    }
}

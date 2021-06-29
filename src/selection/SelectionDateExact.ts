import { SelectionTime } from './SelectionTime';
import { GedcomTag } from '../tag';
import { GedcomSelection } from './GedcomSelection';
import {parseDateExact} from "../parse";

export class SelectionDateExact extends GedcomSelection {
    
    valueAsExactDate() {
        return this.value().map(parseDateExact);
    }

    getTime() {
        return this.get(GedcomTag.Time, null, SelectionTime);
    }
}

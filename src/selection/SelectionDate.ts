import { GedcomSelection } from './GedcomSelection';
import {parseDate} from "../parse";

export class SelectionDate extends GedcomSelection {
    
    valueAsDate() {
        return this.value().map(parseDate);
    }
}

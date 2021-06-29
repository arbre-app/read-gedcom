import { GedcomSelection } from './GedcomSelection';
import {parseDate} from "../parse";

export class SelectionDatePeriod extends GedcomSelection {
    
    valueAsDate() {
        return this.value().map(v => {
            const date = parseDate(v);
            if (date !== null && date.isDatePeriod) {
                return date;
            } else {
                return null;
            }
        });
    }
}

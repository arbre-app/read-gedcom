import { GedcomTag } from '../tag';
import {SelectionIndividualEvent} from "./SelectionIndividualEvent";

export class SelectionIndividualAttribute extends SelectionIndividualEvent {
    
    getType() {
        return this.get(GedcomTag.Type);
    }
}

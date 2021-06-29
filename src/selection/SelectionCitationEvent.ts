import { GedcomTag } from '../tag';
import {SelectionMetaEvent} from "./SelectionMetaEvent";

export class SelectionCitationEvent extends SelectionMetaEvent {
    
    getRole() {
        return this.get(GedcomTag.Role);
    }
}

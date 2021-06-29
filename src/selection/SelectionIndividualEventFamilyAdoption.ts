import { SelectionFamilyReferenceAdoption } from './SelectionFamilyReferenceAdoption';
import { GedcomTag } from '../tag';
import {SelectionIndividualEvent} from "./SelectionIndividualEvent";

export class SelectionIndividualEventFamilyAdoption extends SelectionIndividualEvent {
    
    getFamilyAsChildReference() {
        return this.get(GedcomTag.FamilyChild, null, SelectionFamilyReferenceAdoption);
    }
}

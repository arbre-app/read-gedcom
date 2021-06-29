import { SelectionRomanizationMethod } from './SelectionRomanizationMethod';
import { GedcomTag } from '../tag';
import {SelectionNamePieces} from "./SelectionNamePieces";

export class SelectionNameRomanization extends SelectionNamePieces {
    
    getMethod() {
        return this.get(GedcomTag.Type, null, SelectionRomanizationMethod);
    }
}

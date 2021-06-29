import { SelectionPhonetizationMethod } from './SelectionPhonetizationMethod';
import { GedcomTag } from '../tag';
import {SelectionNamePieces} from "./SelectionNamePieces";

export class SelectionNamePhonetization extends SelectionNamePieces {
    
    getMethod() {
        return this.get(GedcomTag.Type, null, SelectionPhonetizationMethod);
    }
}

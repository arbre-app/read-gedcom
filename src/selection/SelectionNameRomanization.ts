import { SelectionRomanizationMethod, SelectionNamePieces } from './internal';
import { Tag } from '../tag';

export class SelectionNameRomanization extends SelectionNamePieces {
    getMethod() {
        return this.get(Tag.Type, null, SelectionRomanizationMethod);
    }
}

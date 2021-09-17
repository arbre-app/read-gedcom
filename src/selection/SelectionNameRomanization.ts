import { SelectionRomanizationMethod, SelectionNamePieces } from './internal';
import { Tag } from '../tag';

export class SelectionNameRomanization extends SelectionNamePieces {
    getMethod(): SelectionRomanizationMethod {
        return this.get(Tag.Type);
    }
}

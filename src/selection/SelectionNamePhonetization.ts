import { SelectionPhonetizationMethod, SelectionNamePieces } from './internal';
import { Tag } from '../tag';

export class SelectionNamePhonetization extends SelectionNamePieces {
    getMethod() {
        return this.get(Tag.Type, null, SelectionPhonetizationMethod);
    }
}

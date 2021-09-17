import { SelectionPhonetizationMethod, SelectionNamePieces } from './internal';
import { Tag } from '../tag';

export class SelectionNamePhonetization extends SelectionNamePieces {
    getMethod(): SelectionPhonetizationMethod {
        return this.get(Tag.Type);
    }
}

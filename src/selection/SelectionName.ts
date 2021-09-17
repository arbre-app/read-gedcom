import { parseNameParts } from '../parse';
import { SelectionNameType, SelectionNamePhonetization, SelectionNameRomanization, SelectionNamePieces } from './internal';

import { Tag } from '../tag';

export class SelectionName extends SelectionNamePieces {
    valueAsParts() {
        return this.value().map(parseNameParts);
    }

    getType(): SelectionNameType {
        return this.get(Tag.Type);
    }

    getNamePhonetization() {
        return this.get(Tag.Phonetic, null, SelectionNamePhonetization);
    }

    getNameRomanization() {
        return this.get(Tag.Phonetic, null, SelectionNameRomanization);
    }
}

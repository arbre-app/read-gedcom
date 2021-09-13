import { SelectionNameType, SelectionNamePhonetization, SelectionNameRomanization, SelectionNamePieces } from './internal';

import { Tag } from '../tag';

// eslint-disable-next-line
const rNameParts = /^(?:([^\/]*)|(?:(?:([^\/]*?) ?)?\/([^\/]*)\/(?: ?([^\/]*))?))$/;

export class SelectionName extends SelectionNamePieces {
    valueAsParts() {
        return this.value().map(v => {
            if (!v) {
                return null;
            }
            const groups = rNameParts.exec(v);
            if (!groups) {
                return null;
            }
            if (groups[1] === undefined) {
                return [groups[2], groups[3], groups[4]];
            } else {
                return [groups[1], undefined, undefined];
            }
        });
    }

    getType() {
        return this.get(Tag.Type, null, SelectionNameType);
    }

    getNamePhonetization() {
        return this.get(Tag.Phonetic, null, SelectionNamePhonetization);
    }

    getNameRomanization() {
        return this.get(Tag.Phonetic, null, SelectionNameRomanization);
    }
}

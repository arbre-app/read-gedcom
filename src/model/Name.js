import { NamePhonetization } from './NamePhonetization';
import { NamePieces } from './NamePieces';
import { NameRomanization } from './NameRomanization';
import { NameType } from './NameType';
import { Tag } from '../tag';

const rNameParts = /^(?:([^\/]*)|(?:(?:([^\/]*) )?\/([^\/]*)\/(?: ([^\/]*))?))$/;

export class Name extends NamePieces {
    constructor(data, clazz) {
        super(data, clazz || Name);
    }

    valueAsParts() {
        return this.value().map(v => {
            if (!v) {
                return null;
            }
            const groups = rNameParts.exec(v);
            if (!groups) {
                return null;
            }
            if (groups[4] === undefined) {
                return [groups[1], groups[2], groups[3]];
            } else {
                return [groups[4], undefined, undefined];
            }
        });
    }

    getType(q) {
        return this.get(Tag.TYPE, q, NameType);
    }

    getNamePhonetization(q) {
        return this.get(Tag.PHONETIC, q, NamePhonetization);
    }

    getNameRomanization(q) {
        return this.get(Tag.PHONETIC, q, NameRomanization);
    }
}

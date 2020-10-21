import { NamePhonetization } from './NamePhonetization';
import { NamePieces } from './NamePieces';
import { NameRomanization } from './NameRomanization';
import { NameType } from './NameType';
import { Tag } from '../tag';

const rNameParts = /^(?:([^\/]*)|(?:(?:([^\/]*) )?\/([^\/]*)\/(?: ([^\/]*))?))$/;

export class Name extends NamePieces {
    constructor(data) {
        super(data, Name);
    }

    valueAsParts() {
        return this.valueMap(v => {
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

    getType() {
        return this.getByTag(Tag.TYPE, NameType);
    }

    getNamePhonetization() {
        return this.getByTag(Tag.PHONETIC, NamePhonetization);
    }

    getNameRomanization() {
        return this.getByTag(Tag.PHONETIC, NameRomanization);
    }
}

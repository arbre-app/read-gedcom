import { SelectionNameType } from './SelectionNameType';
import { SelectionNamePhonetization } from './SelectionNamePhonetization';
import { SelectionNameRomanization } from './SelectionNameRomanization';
import { GedcomTag } from '../tag';
import {SelectionNamePieces} from "./SelectionNamePieces";

const rNameParts = /^(?:([^/]*)|(?:(?:([^/]*) ?)?\/([^/]*)\/(?: ?([^/]*))?))$/;

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
        return this.get(GedcomTag.Type, null, SelectionNameType);
    }

    getNamePhonetization() {
        return this.get(GedcomTag.Phonetic, null, SelectionNamePhonetization);
    }

    getNameRomanization() {
        return this.get(GedcomTag.Phonetic, null, SelectionNameRomanization);
    }
}

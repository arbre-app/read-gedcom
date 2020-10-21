import { Tag } from '../tag';
import { NamePieces } from './NamePieces';
import { RomanizationMethod } from './RomanizationMethod';

export class NameRomanization extends NamePieces {
    constructor(data, clazz) {
        super(data, clazz || NameRomanization);
    }

    getMethod() {
        return this.get(Tag.TYPE, RomanizationMethod);
    }
}

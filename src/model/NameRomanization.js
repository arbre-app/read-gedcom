import { Tag } from '../tag';
import { NamePieces } from './NamePieces';
import { RomanizationMethod } from './RomanizationMethod';

export class NameRomanization extends NamePieces {
    constructor(data) {
        super(data, NameRomanization);
    }

    getMethod() {
        return this.getByTag(Tag.TYPE, RomanizationMethod);
    }
}

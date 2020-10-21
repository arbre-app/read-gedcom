import { Tag } from '../tag';
import { NamePieces } from './NamePieces';
import { PhonetizationMethod } from './PhonetizationMethod';

export class NamePhonetization extends NamePieces {
    constructor(data) {
        super(data, NamePhonetization);
    }

    getMethod() {
        return this.getByTag(Tag.TYPE, PhonetizationMethod);
    }
}

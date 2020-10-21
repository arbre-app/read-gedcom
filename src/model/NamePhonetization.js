import { Tag } from '../tag';
import { NamePieces } from './NamePieces';
import { PhonetizationMethod } from './PhonetizationMethod';

export class NamePhonetization extends NamePieces {
    constructor(data, clazz) {
        super(data, clazz || NamePhonetization);
    }

    getMethod() {
        return this.get(Tag.TYPE, PhonetizationMethod);
    }
}

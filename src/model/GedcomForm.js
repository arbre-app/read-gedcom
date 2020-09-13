import { Node } from './Node';
import { Tag } from '../parse';

export class GedcomForm extends Node {
    static LINEAGE_LINKED = 'LINEAGE-LINKED';

    constructor(data) {
        super(data, GedcomForm);
    }

    getVersion() {
        return this.getByTag(Tag.VERSION_NUMBER);
    }

    getName() {
        return this.getByTag(Tag.NAME)
    }
}

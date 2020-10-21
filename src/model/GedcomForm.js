import { Node } from './Node';
import { Tag } from '../tag';

export class GedcomForm extends Node {
    static LINEAGE_LINKED = 'LINEAGE-LINKED';

    constructor(data, clazz) {
        super(data, clazz || GedcomForm);
    }

    getVersion() {
        return this.get(Tag.VERSION);
    }

    getName() {
        return this.get(Tag.NAME)
    }
}

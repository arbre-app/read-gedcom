import { Node } from './Node';
import { Tag } from '../tag';

export class GedcomForm extends Node {
    static LINEAGE_LINKED = 'LINEAGE-LINKED';

    constructor(data, clazz) {
        super(data, clazz || GedcomForm);
    }

    getVersion(q) {
        return this.get(Tag.VERSION, q);
    }

    getName(q) {
        return this.get(Tag.NAME, q)
    }
}

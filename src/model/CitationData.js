import { Tag } from '../tag';
import { Date } from './Date';
import { Node } from './Node';

export class CitationData extends Node {
    constructor(data, clazz) {
        super(data, clazz || CitationData);
    }

    getDate(q) {
        return this.get(Tag.DATE, q, Date);
    }

    getText(q) {
        return this.get(Tag.TEXT, q);
    }
}

import { Tag } from '../tag';
import { Date } from './Date';
import { Node } from './Node';

export class CitationData extends Node {
    constructor(data, clazz) {
        super(data, clazz || CitationData);
    }

    getDate() {
        return this.get(Tag.DATE, Date);
    }

    getText() {
        return this.get(Tag.TEXT);
    }
}

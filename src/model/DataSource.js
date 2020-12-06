import { Node } from './Node';
import { Date } from './Date';
import { Tag } from '../tag';

export class DataSource extends Node {
    constructor(data, clazz) {
        super(data, clazz || DataSource);
    }

    getDate(q) {
        return this.get(Tag.DATE, q, Date);
    }

    getCopyright(q) {
        return this.get(Tag.COPYRIGHT, q);
    }
}
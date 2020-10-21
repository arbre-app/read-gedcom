import { Node } from './Node';
import { Date } from './Date';
import { Tag } from '../tag';

export class DataSource extends Node {
    constructor(data, clazz) {
        super(data, clazz || DataSource);
    }

    getDate() {
        return this.get(Tag.DATE, Date);
    }

    getCopyright() {
        return this.get(Tag.COPYRIGHT);
    }
}
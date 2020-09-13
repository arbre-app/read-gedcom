import { Node } from './Node';
import { Date } from './Date';
import { Tag } from '../parse';

export class DataSource extends Node {
    constructor(data) {
        super(data, DataSource);
    }

    getDate() {
        return this.getByTag(Tag.DATE, Date);
    }

    getCopyright() {
        return this.getByTag(Tag.COPYRIGHT);
    }
}
import { Node } from './Node';
import { Tag } from '../tag';
import { Corporation } from './Corporation';
import { DataSource } from './DataSource';

export class GedcomSource extends Node {
    constructor(data, clazz) {
        super(data, clazz || GedcomSource);
    }

    getVersion(q) {
        return this.get(Tag.VERSION, q);
    }

    getName(q) {
        return this.get(Tag.NAME, q);
    }

    getCorporation(q) {
        return this.get(Tag.CORPORATE, q, Corporation);
    }

    getDataSource(q) {
        return this.get(Tag.DATA, q, DataSource);
    }
}

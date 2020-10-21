import { Node } from './Node';
import { Tag } from '../tag';
import { Corporation } from './Corporation';
import { DataSource } from './DataSource';

export class GedcomSource extends Node {
    constructor(data, clazz) {
        super(data, clazz || GedcomSource);
    }

    getVersion() {
        return this.get(Tag.VERSION);
    }

    getName() {
        return this.get(Tag.NAME);
    }

    getCorporation() {
        return this.get(Tag.CORPORATE, Corporation);
    }

    getDataSource() {
        return this.get(Tag.DATA, DataSource);
    }
}

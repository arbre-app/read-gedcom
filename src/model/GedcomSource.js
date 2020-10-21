import { Node } from './Node';
import { Tag } from '../tag';
import { Corporation } from './Corporation';
import { DataSource } from './DataSource';

export class GedcomSource extends Node {
    constructor(data) {
        super(data, GedcomSource);
    }

    getVersion() {
        return this.getByTag(Tag.VERSION);
    }

    getName() {
        return this.getByTag(Tag.NAME);
    }

    getCorporation() {
        return this.getByTag(Tag.CORPORATE, Corporation);
    }

    getDataSource() {
        return this.getByTag(Tag.DATA, DataSource);
    }
}

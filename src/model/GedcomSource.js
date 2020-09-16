import { Node } from './Node';
import { Tag } from '../tag';
import { Corporation } from './Corporation';
import { DataSource } from './DataSource';

export class GedcomSource extends Node {
    constructor(data) {
        super(data, GedcomSource);
    }

    getVersion() {
        return this.getByTag(Tag.VERSION_NUMBER);
    }

    getName() {
        return this.getByTag(Tag.NAME);
    }

    getCorporation() {
        return this.getByTag(Tag.CORPORATION, Corporation);
    }

    getDataSource() {
        return this.getByTag(Tag.DATA_SOURCE, DataSource);
    }
}

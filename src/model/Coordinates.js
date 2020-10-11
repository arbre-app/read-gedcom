import { Node } from './Node';
import { Tag } from '../tag';

export class Coordinates extends Node {
    constructor(data) {
        super(data, Coordinates);
    }

    getLatitude() {
        return this.getByTag(Tag.LATITUDE);
    }

    getLongitude() {
        return this.getByTag(Tag.LONGITUDE);
    }
}

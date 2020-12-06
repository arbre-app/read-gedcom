import { Node } from './Node';
import { Tag } from '../tag';

export class Coordinates extends Node {
    constructor(data, clazz) {
        super(data, clazz || Coordinates);
    }

    getLatitude(q) {
        return this.get(Tag.LATITUDE, q);
    }

    getLongitude(q) {
        return this.get(Tag.LONGITUDE, q);
    }
}

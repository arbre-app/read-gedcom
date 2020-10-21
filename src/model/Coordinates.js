import { Node } from './Node';
import { Tag } from '../tag';

export class Coordinates extends Node {
    constructor(data, clazz) {
        super(data, clazz || Coordinates);
    }

    getLatitude() {
        return this.get(Tag.LATITUDE);
    }

    getLongitude() {
        return this.get(Tag.LONGITUDE);
    }
}

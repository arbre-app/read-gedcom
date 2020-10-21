import { Node } from './Node';
import { Tag } from '../tag';

export class SourceRecord extends Node {
    constructor(data, clazz) {
        super(data, clazz || SourceRecord);
    }

}

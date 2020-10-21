import { Node } from './Node';

export class Reference extends Node {
    constructor(data, clazz) {
        super(data, clazz || Reference);
    }
}

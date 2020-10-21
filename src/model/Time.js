import { Node } from './Node';

export class Time extends Node {
    constructor(data, clazz) {
        super(data, clazz || Time);
    }
}

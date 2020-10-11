import { Node } from './Node';

export class Reference extends Node {
    constructor(data) {
        super(data, Reference);
    }
}

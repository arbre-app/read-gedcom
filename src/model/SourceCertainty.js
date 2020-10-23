import { Node } from './Node';

export class SourceCertainty extends Node {
    static UNRELIABLE = 0;
    static QUESTIONABLE = 1;
    static SECONDARY = 2;
    static PRIMARY = 3;

    constructor(data, clazz) {
        super(data, clazz || SourceCertainty);
    }
}

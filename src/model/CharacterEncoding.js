import { Node } from './Node';

export class CharacterEncoding extends Node {
    static UTF_8 = 'UTF-8';
    static UNICODE = 'UNICODE';
    static ANSEL = 'ANSEL';
    static ASCII = 'ASCII';

    constructor(data) {
        super(data, CharacterEncoding);
    }
}

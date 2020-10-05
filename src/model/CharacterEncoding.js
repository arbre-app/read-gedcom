import { Node } from './Node';

export class CharacterEncoding extends Node {
    static UTF_8 = 'UTF-8';
    static UNICODE = 'UNICODE'; // While technically not the name of a charset, it is used by some software
    static ANSEL = 'ANSEL';
    static ASCII = 'ASCII';
    static ANSI = 'ANSI';

    constructor(data) {
        super(data, CharacterEncoding);
    }
}

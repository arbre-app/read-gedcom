import { Node } from './Node';

export class PhonetisationMethod extends Node {
    static HANGUL = 'Hangul';
    static KANA = 'kana';

    constructor(data) {
        super(data, PhonetisationMethod);
    }
}

import { Node } from './Node';

export class PhonetizationMethod extends Node {
    static HANGUL = 'Hangul';
    static KANA = 'kana';

    constructor(data, clazz) {
        super(data, clazz || PhonetizationMethod);
    }
}

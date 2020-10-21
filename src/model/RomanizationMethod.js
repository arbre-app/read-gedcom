import { Node } from './Node';

export class RomanizationMethod extends Node {
    static PINYIN = 'pinyin';
    static ROMAJI = 'romaji';
    static WADEGILES = 'wadegiles'

    constructor(data, clazz) {
        super(data, clazz || RomanizationMethod);
    }
}

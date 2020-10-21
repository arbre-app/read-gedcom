import { Node } from './Node';
import { Tag } from '../tag';

export class NameType extends Node {
    static ALIAS_NAME = 'aka';
    static BIRTH_NAME = 'birth';
    static IMMIGRATION_NAME = 'immigrant';
    static MAIDEN_NAME = 'maiden';
    static MARRIED_NAME = 'married';

    constructor(data, clazz) {
        super(data, clazz || NameType);
    }

}

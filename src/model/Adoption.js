import { Node } from './Node';

export class Adoption extends Node {
    static HUSBAND = 'HUSB';
    static WIFE = 'WIFE';
    static BOTH = 'BOTH';

    constructor(data, clazz) {
        super(data, clazz || Adoption);
    }
}

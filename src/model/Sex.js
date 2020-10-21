import { Node } from './Node';

export class Sex extends Node {
    static MALE = 'M';
    static FEMALE = 'F';
    static INTERSEX = 'X';
    static UNKNOWN = 'U';
    static NOT_RECORDED = 'N';

    constructor(data, clazz) {
        super(data, clazz || Sex);
    }
}

import { Node } from './Node';

export class PedigreeLinkageType extends Node {
    static ADOPTED = 'adopted';
    static BIRTH = 'birth';
    static FOSTER = 'foster';

    constructor(data, clazz) {
        super(data, clazz || PedigreeLinkageType);
    }
}

import { Node } from './Node';

export class PedigreeLinkageType extends Node {
    ADOPTED = 'adopted';
    BIRTH = 'birth';
    FOSTER = 'foster';

    constructor(data, clazz) {
        super(data, clazz || PedigreeLinkageType);
    }
}

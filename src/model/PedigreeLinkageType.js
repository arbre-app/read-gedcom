import { Node } from './Node';

export class PedigreeLinkageType extends Node {
    ADOPTED = 'adopted';
    BIRTH = 'birth';
    FOSTER = 'foster';

    constructor(data) {
        super(data, PedigreeLinkageType);
    }
}

import { Node } from './Node';
import { parseDate } from '../parse';

export class Date extends Node {
    constructor(data) {
        super(data, Date);
    }

    valueAsDate() {
        return this.valueMap(parseDate);
    }
}

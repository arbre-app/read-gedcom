import { Node } from './Node';
import { parseDate } from '../parse/date'; // Needed to avoid circular dependency

export class Date extends Node {
    constructor(data, clazz) {
        super(data, clazz || Date);
    }

    valueAsDate() {
        return this.value().map(parseDate);
    }
}

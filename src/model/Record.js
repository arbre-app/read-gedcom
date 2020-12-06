import { Tag } from '../tag';
import { Changed } from './Changed';
import { Node } from './Node';
import { ReferenceNumber } from './ReferenceNumber';

export class Record extends Node {
    constructor(data, clazz) {
        super(data, clazz || clazz || Record);
    }

    getReferenceNumber(q) {
        return this.get(Tag.REFERENCE, q, ReferenceNumber);
    }

    getRecordIdentificationNumber(q) {
        return this.get(Tag.RECORD_ID_NUMBER, q)
    }

    getChanged(q) {
        return this.get(Tag.CHANGE, q, Changed);
    }
}

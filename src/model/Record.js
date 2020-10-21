import { Tag } from '../tag';
import { Changed } from './Changed';
import { Node } from './Node';
import { ReferenceNumber } from './ReferenceNumber';

export class Record extends Node {
    constructor(data, clazz) {
        super(data, clazz || clazz || Record);
    }

    getReferenceNumber() {
        return this.get(Tag.REFERENCE, ReferenceNumber);
    }

    getRecordIdentificationNumber() {
        return this.get(Tag.RECORD_ID_NUMBER)
    }

    getChanged() {
        return this.get(Tag.CHANGE, Changed);
    }
}

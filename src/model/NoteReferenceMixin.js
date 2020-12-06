import { Node } from './Node';

export class NoteReferenceMixin extends Node {
    constructor(data, clazz) {
        super(data, clazz || NoteReferenceMixin);
    }

    getNoteRecord(q) {
        return this.getGedcom().getNoteRecord(this.value().all(), q);
    }
}

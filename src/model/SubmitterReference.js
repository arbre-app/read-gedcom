import { Reference } from './Reference';

export class SubmitterReference extends Reference {
    constructor(data, clazz) {
        super(data, clazz || SubmitterReference);
    }

    getSubmitterRecord(q) {
        return this.getGedcom().getSubmitterRecord(this.value().all(), q);
    }
}

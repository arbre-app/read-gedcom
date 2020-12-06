import { Reference } from './Reference';

export class FamilyReference extends Reference {
    constructor(data, clazz) {
        super(data, clazz || FamilyReference);
    }

    getFamilyRecord(q) {
        return this.getGedcom().getFamilyRecord(this.value().all(), q);
    }
}

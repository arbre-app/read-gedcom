import { Reference } from './Reference';

export class FamilyReference extends Reference {
    constructor(data, clazz) {
        super(data, clazz || FamilyReference);
    }

    getFamilyRecord() {
        return this.getGedcom().getFamilyRecord(this.value());
    }
}

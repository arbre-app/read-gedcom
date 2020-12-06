import { Reference } from './Reference';

export class IndividualReference extends Reference {
    constructor(data, clazz) {
        super(data, clazz || IndividualReference);
    }

    getIndividualRecord(q) {
        return this.getGedcom().getIndividualRecord(this.value().all(), q);
    }
}

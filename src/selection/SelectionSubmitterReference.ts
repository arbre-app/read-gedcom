import {SelectionReference} from "./SelectionReference";

export class SelectionSubmitterReference extends SelectionReference {
    
    getSubmitterRecord() {
        return this.root().getSubmitterRecord(this.valueNonNull());
    }
}

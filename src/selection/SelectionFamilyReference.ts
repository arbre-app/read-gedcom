import {SelectionReference} from "./SelectionReference";

export class SelectionFamilyReference extends SelectionReference {
    
    getFamilyRecord() {
        return this.root().getFamilyRecord(this.valueNonNull());
    }
}

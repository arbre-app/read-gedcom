import { SelectionAny } from './Selection';

export class SelectionMetaEvent extends SelectionAny {
    
    valueAsArray() {
        return this.value().map(v => v !== null ? v.split(', ') : null); // Not a typo, comma is followed by a space
    }
}

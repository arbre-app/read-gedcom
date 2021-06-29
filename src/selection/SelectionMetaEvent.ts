import { GedcomSelection } from './GedcomSelection';

export class SelectionMetaEvent extends GedcomSelection {
    
    valueAsArray() {
        return this.value().map(v => v !== null ? v.split(', ') : null); // Not a typo, comma is followed by a space
    }
}

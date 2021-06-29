import { GedcomSelection } from './GedcomSelection';

export class SelectionNoteReferenceMixin extends GedcomSelection {
    
    getNoteRecord() {
        return this.root().getNoteRecord(this.valueNonNull());
    }
}

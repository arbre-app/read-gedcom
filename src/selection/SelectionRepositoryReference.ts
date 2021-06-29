import { GedcomTag } from '../tag';
import { GedcomSelection } from './GedcomSelection';

export class SelectionRepositoryReference extends GedcomSelection {
    
    getRepositoryRecord() {
        return this.root().getRepositoryRecord(this.valueNonNull());
    }

    getSourceCallNumber() {
        return this.get(GedcomTag.CallNumber);
    }
}

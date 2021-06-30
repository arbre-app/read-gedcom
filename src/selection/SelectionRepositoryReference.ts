import { GedcomTag } from '../tag';
import { SelectionAny } from './SelectionAny';

export class SelectionRepositoryReference extends SelectionAny {
    getRepositoryRecord() {
        return this.root().getRepositoryRecord(this.valueNonNull());
    }

    getSourceCallNumber() {
        return this.get(GedcomTag.CallNumber);
    }
}

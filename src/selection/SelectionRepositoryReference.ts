import { Tag } from '../tag';
import { SelectionAny } from './internal';

export class SelectionRepositoryReference extends SelectionAny {
    getRepositoryRecord() {
        return this.root().getRepositoryRecord(this.valueNonNull());
    }

    getSourceCallNumber() {
        return this.get(Tag.CallNumber);
    }
}

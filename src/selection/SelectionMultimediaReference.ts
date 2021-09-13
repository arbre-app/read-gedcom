import { SelectionReference } from './internal';

export class SelectionMultimediaReference extends SelectionReference {
    getMultimediaRecord() {
        return this.root().getMultimediaRecord(this.valueNonNull());
    }
}

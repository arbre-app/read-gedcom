import { SelectionReference } from './SelectionReference';

export class SelectionMultimediaReference extends SelectionReference {
    getMultimediaRecord() {
        return this.root().getMultimediaRecord(this.valueNonNull());
    }
}

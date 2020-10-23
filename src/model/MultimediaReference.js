import { Reference } from './Reference';

export class MultimediaReference extends Reference {
    constructor(data, clazz) {
        super(data, clazz || MultimediaReference);
    }

    getMultimediaRecord() {
        return this.getGedcom().getMultimediaRecord(this.value());
    }
}
import { Tag } from '../tag';
import { MultimediaFormat } from './MultimediaFormat';
import { Node } from './Node';

export class MultimediaFile extends Node {
    constructor(data, clazz) {
        super(data, clazz || MultimediaFile);
    }

    getFormat() {
        return this.get(Tag.FORMAT, MultimediaFormat);
    }

    getTitle() {
        return this.get(Tag.TITLE);
    }
}

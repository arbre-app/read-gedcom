import { Tag } from '../tag';
import { MultimediaFormat } from './MultimediaFormat';
import { Node } from './Node';

export class MultimediaFile extends Node {
    constructor(data, clazz) {
        super(data, clazz || MultimediaFile);
    }

    getFormat(q) {
        return this.get(Tag.FORMAT, q, MultimediaFormat);
    }

    getTitle(q) {
        return this.get(Tag.TITLE, q);
    }
}

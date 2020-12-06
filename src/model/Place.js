import { Coordinates } from './Coordinates';
import { Node } from './Node';
import { Tag } from '../tag';
import { NoteReferenceMixin } from './NoteReferenceMixin';
import { Phonetization } from './Phonetization';
import { Romanization } from './Romanization';

export class Place extends Node {
    constructor(data, clazz) {
        super(data, clazz || Place);
    }

    getPhonetization(q) {
        return this.get(Tag.PHONETIC, q, Phonetization);
    }

    getRomanization(q) {
        return this.get(Tag.ROMANIZED, q, Romanization);
    }

    getCoordinates(q) {
        return this.get(Tag.MAP, q, Coordinates);
    }

    getNote(q) {
        return this.get(Tag.NOTE, q, NoteReferenceMixin);
    }
}

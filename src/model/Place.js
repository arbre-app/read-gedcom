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

    getPhonetization() {
        return this.get(Tag.PHONETIC, Phonetization);
    }

    getRomanization() {
        return this.get(Tag.ROMANIZED, Romanization);
    }

    getCoordinates() {
        return this.get(Tag.MAP, Coordinates);
    }

    getNote() {
        return this.get(Tag.NOTE, NoteReferenceMixin);
    }
}

import { Coordinates } from './Coordinates';
import { Node } from './Node';
import { Tag } from '../tag';
import { NoteReferenceMixin } from './NoteReferenceMixin';
import { Phonetization } from './Phonetization';
import { Romanization } from './Romanization';

export class Place extends Node {
    constructor(data) {
        super(data, Place);
    }

    getPhonetization() {
        return this.getByTag(Tag.PHONETIC, Phonetization);
    }

    getRomanization() {
        return this.getByTag(Tag.ROMANIZED, Romanization);
    }

    getCoordinates() {
        return this.getByTag(Tag.MAP, Coordinates);
    }

    getNote() {
        return this.getByTag(Tag.NOTE, NoteReferenceMixin);
    }
}

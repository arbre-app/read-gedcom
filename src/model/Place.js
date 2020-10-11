import { Coordinates } from './Coordinates';
import { Node } from './Node';
import { Tag } from '../tag';
import { NoteReference } from './NoteReference';
import { Phonetisation } from './Phonetisation';
import { Romanisation } from './Romanisation';

export class Place extends Node {
    constructor(data) {
        super(data, Place);
    }

    getPhonetisation() {
        return this.getByTag(Tag.PHONETIC, Phonetisation);
    }

    getRomanisation() {
        return this.getByTag(Tag.ROMANISED, Romanisation);
    }

    getCoordinates() {
        return this.getByTag(Tag.MAP, Coordinates);
    }

    getNote() {
        return this.getByTag(Tag.NOTE, NoteReference);
    }
}

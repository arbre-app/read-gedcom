import { Node } from './Node';
import { GedcomFile } from './GedcomFile';
import { CharacterEncoding } from './CharacterEncoding';
import { Tag } from '../parse';

export class Header extends Node {
    constructor(data) {
        super(data, Header);
    }

    getGedcomFile() {
        return this.getByTag(Tag.GEDCOM_FILE, GedcomFile);
    }

    getCharacterEncoding() {
        return this.getByTag(Tag.CHARACTER_ENCODING, CharacterEncoding);
    }

    getSource() {
        return this.getByTag(Tag.SOURCE);
    }
}

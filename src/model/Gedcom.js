import { Node } from './Node';
import { Header } from './Header';
import { IndividualRecord } from './IndividualRecord';
import { Tag } from '../tag';

export class Gedcom extends Node {
    constructor(data) {
        super(data, Gedcom);
        this._data.root = this; // Root is its own root
        this._data.parent = null; // Root has no parent
        this._data.parentIndices = []; // Operation not supported = empty array is acceptable
    }

    getHeader() {
        return this.getByTag(Tag.HEADER, Header);
    }

    getIndividual(id) {
        return this.getByTagPointer(Tag.INDIVIDUAL, id, IndividualRecord);
    }

    getFamily(id) {
        return this.getByTagPointer(Tag.FAMILY, id, Node); // TODO
    }

    // TODO
}

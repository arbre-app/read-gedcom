import { NameType } from './NameType';
import { Node } from './Node';
import { Tag } from '../tag';
import { NoteReference } from './NoteReference';
import { SourceReference } from './SourceReference';

const rNameParts = /^(?:([^\/]*)|(?:(?:([^\/]*) )?\/([^\/]*)\/(?: ([^\/]*))?))$/

export class Name extends Node {
    constructor(data) {
        super(data, Name);
    }

    valueAsParts() {
        return this.valueMap(v => {
            if(!v) {
                return null;
            }
            const groups = rNameParts.exec(v);
            if(!groups) {
                return null;
            }
            if(groups[4] === undefined) {
                return [groups[1], groups[2], groups[3]];
            } else {
                return [groups[4], undefined, undefined];
            }
        })
    }

    getType() {
        return this.getByTag(Tag.TYPE, NameType);
    }

    getPrefixName() {
        return this.getByTag(Tag.NAME_PREFIX);
    }

    getGivenName() {
        return this.getByTag(Tag.NAME_GIVEN);
    }

    getNameNick() {
        return this.getByTag(Tag.NAME_NICK);
    }

    getPrefixSurname() {
        return this.getByTag(Tag.SURNAME_PREFIX);
    }

    getSurname() {
        return this.getByTag(Tag.SURNAME);
    }

    getSurnameSuffix() {
        return this.getByTag(Tag.SURNAME_SUFFIX);
    }

    getNote() {
        return this.getByTag(Tag.NOTE, NoteReference);
    }

    getSource() {
        return this.getByTag(Tag.SOURCE, SourceReference);
    }
}

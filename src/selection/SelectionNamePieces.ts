import { SelectionNoteReferenceMixin } from './SelectionNoteReferenceMixin';
import { SelectionSourceCitation } from './SelectionSourceCitation';
import { GedcomTag } from '../tag';
import { GedcomSelection } from './GedcomSelection';
import {SelectionWithNoteMixin} from "./mixin";

export class SelectionNamePieces extends SelectionWithNoteMixin(GedcomSelection) {
    
    getPrefixName() {
        return this.get(GedcomTag.NamePrefix);
    }

    getGivenName() {
        return this.get(GedcomTag.GivenName);
    }

    getNickname() {
        return this.get(GedcomTag.Nickname);
    }

    getPrefixSurname() {
        return this.get(GedcomTag.SurnamePrefix);
    }

    getSurname() {
        return this.get(GedcomTag.Surname);
    }

    getNameSuffix() {
        return this.get(GedcomTag.NameSuffix);
    }

    getSourceCitation() {
        return this.get(GedcomTag.Source, null, SelectionSourceCitation);
    }
}

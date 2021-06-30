import { SelectionWithNoteSourceCitationMixin } from './mixin';
import { GedcomTag } from '../tag';
import { SelectionAny } from './SelectionAny';

export class SelectionNamePieces extends SelectionWithNoteSourceCitationMixin(SelectionAny) {
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
}

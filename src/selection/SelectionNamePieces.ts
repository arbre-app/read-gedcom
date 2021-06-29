import { SelectionSourceCitation } from './SelectionSourceCitation';
import { GedcomTag } from '../tag';
import { SelectionAny } from './Selection';
import { SelectionWithNoteMixin } from './mixin';

export class SelectionNamePieces extends SelectionWithNoteMixin(SelectionAny) {
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

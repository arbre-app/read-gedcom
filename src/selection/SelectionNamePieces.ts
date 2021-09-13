import { SelectionWithNoteSourceCitationMixin } from './mixin';
import { Tag } from '../tag';
import { SelectionAny } from './internal';

export class SelectionNamePieces extends SelectionWithNoteSourceCitationMixin(SelectionAny) {
    getPrefixName() {
        return this.get(Tag.NamePrefix);
    }

    getGivenName() {
        return this.get(Tag.GivenName);
    }

    getNickname() {
        return this.get(Tag.Nickname);
    }

    getPrefixSurname() {
        return this.get(Tag.SurnamePrefix);
    }

    getSurname() {
        return this.get(Tag.Surname);
    }

    getNameSuffix() {
        return this.get(Tag.NameSuffix);
    }
}

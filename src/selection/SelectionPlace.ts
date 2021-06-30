import { SelectionPhonetization } from './SelectionPhonetization';
import { SelectionRomanization } from './SelectionRomanization';
import { SelectionCoordinates } from './SelectionCoordinates';
import { GedcomTag } from '../tag';
import { SelectionAny } from './SelectionAny';
import { SelectionWithNoteMixin } from './mixin';

export class SelectionPlace extends SelectionWithNoteMixin(SelectionAny) {
    getPhonetization() {
        return this.get(GedcomTag.Phonetic, null, SelectionPhonetization);
    }

    getRomanization() {
        return this.get(GedcomTag.Romanized, null, SelectionRomanization);
    }

    getCoordinates() {
        return this.get(GedcomTag.Map, null, SelectionCoordinates);
    }
}

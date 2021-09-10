import { SelectionPhonetization } from './SelectionPhonetization';
import { SelectionRomanization } from './SelectionRomanization';
import { SelectionCoordinates } from './SelectionCoordinates';
import { GedcomTag } from '../tag';
import { SelectionAny } from './SelectionAny';
import { SelectionWithNoteMixin } from './mixin';

export class SelectionPlace extends SelectionWithNoteMixin(SelectionAny) {
    valueAsParts() {
        return this.value().map(v => {
            if(v === null) {
                return null;
            }
            return v.split(/, ?/); // Space is mandatory according to specification, but we still accept it if it's missing
        });
    }

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

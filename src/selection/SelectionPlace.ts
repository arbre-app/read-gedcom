import { SelectionPhonetization, SelectionRomanization, SelectionCoordinates, SelectionAny } from './internal';

import { Tag } from '../tag';

import { SelectionWithNoteMixin } from './mixin';

export class SelectionPlace extends SelectionWithNoteMixin(SelectionAny) {
    valueAsParts() {
        return this.value().map(v => {
            if (v === null) {
                return null;
            }
            return v.split(/, ?/); // Space is mandatory according to specification, but we still accept it if it's missing
        });
    }

    getPhonetization() {
        return this.get(Tag.Phonetic, null, SelectionPhonetization);
    }

    getRomanization() {
        return this.get(Tag.Romanized, null, SelectionRomanization);
    }

    getCoordinates() {
        return this.get(Tag.Map, null, SelectionCoordinates);
    }
}

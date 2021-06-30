import { SelectionAny } from './SelectionAny';

const rVersion = /^(0|[1-9][0-9]{0,2})\.(0|[1-9][0-9]{0,2})(?:\.(0|[1-9][0-9]{0,2}))?$/;

export class SelectionGedcomVersion extends SelectionAny {
    valueAsVersion() {
        return this.value().map(v => {
            if (!v) {
                return null;
            }
            const groups = rVersion.exec(v);
            if (!groups) {
                return null;
            }
            const numbers = [];
            for (let i = 0; i < 3 && groups[i + 1]; i++) {
                numbers.push(parseInt(groups[i + 1]));
            }
            return numbers;
        });
    }
}

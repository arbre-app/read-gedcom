import { SelectionDate, SelectionAny } from './internal';
import { Tag } from '../tag';

export class SelectionDataSource extends SelectionAny {
    getDate() {
        return this.get(Tag.Date, null, SelectionDate);
    }

    getCopyright() {
        return this.get(Tag.Copyright);
    }
}

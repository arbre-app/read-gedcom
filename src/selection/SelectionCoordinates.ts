import { GedcomTag } from '../tag';
import { SelectionAny } from './SelectionAny';

export class SelectionCoordinates extends SelectionAny {
    getLatitude() {
        return this.get(GedcomTag.Latitude);
    }

    getLongitude() {
        return this.get(GedcomTag.Longitude);
    }
}

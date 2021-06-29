import { GedcomTag } from '../tag';
import { SelectionAny } from './Selection';

export class SelectionCoordinates extends SelectionAny {
    getLatitude() {
        return this.get(GedcomTag.Latitude);
    }

    getLongitude() {
        return this.get(GedcomTag.Longitude);
    }
}

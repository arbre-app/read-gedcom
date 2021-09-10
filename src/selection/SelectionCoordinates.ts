import { GedcomTag } from '../tag';
import { SelectionAny } from './SelectionAny';
import { SelectionLatitude } from './SelectionLatitude';
import { SelectionLongitude } from './SelectionLongitude';

export class SelectionCoordinates extends SelectionAny {
    getLatitude() {
        return this.get(GedcomTag.Latitude, null, SelectionLatitude);
    }

    getLongitude() {
        return this.get(GedcomTag.Longitude, null, SelectionLongitude);
    }
}

import { Tag } from '../tag';
import { SelectionAny, SelectionLatitude, SelectionLongitude } from './internal';

export class SelectionCoordinates extends SelectionAny {
    getLatitude() {
        return this.get(Tag.Latitude, null, SelectionLatitude);
    }

    getLongitude() {
        return this.get(Tag.Longitude, null, SelectionLongitude);
    }
}

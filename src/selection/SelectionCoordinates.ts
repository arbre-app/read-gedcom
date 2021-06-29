import { GedcomTag } from '../tag';
import { GedcomSelection } from './GedcomSelection';

export class SelectionCoordinates extends GedcomSelection {
    
    getLatitude() {
        return this.get(GedcomTag.Latitude);
    }

    getLongitude() {
        return this.get(GedcomTag.Longitude);
    }
}

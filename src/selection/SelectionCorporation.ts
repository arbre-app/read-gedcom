import { SelectionAddress } from './SelectionAddress';
import { GedcomTag } from '../tag';
import { SelectionAddressStructure } from './SelectionAddressStructure';

export class SelectionCorporation extends SelectionAddressStructure {
    getAddress() {
        return this.get(GedcomTag.Address, null, SelectionAddress);
    }
}

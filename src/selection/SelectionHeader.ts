import { SelectionGedcomFile } from './SelectionGedcomFile';
import { SelectionCharacterEncoding } from './SelectionCharacterEncoding';
import { SelectionGedcomSource } from './SelectionGedcomSource';
import { SelectionDateExact } from './SelectionDateExact';
import { SelectionSubmitterReference } from './SelectionSubmitterReference';
import { GedcomTag } from '../tag';
import { GedcomSelection } from './GedcomSelection';
import {SelectionWithNoteMixin} from "./mixin";

export class SelectionHeader extends SelectionWithNoteMixin(GedcomSelection) {
    
    getGedcomFile() {
        return this.get(GedcomTag.Gedcom, null, SelectionGedcomFile);
    }

    getCharacterEncoding() {
        return this.get(GedcomTag.Character, null, SelectionCharacterEncoding);
    }

    getSourceSystem() {
        return this.get(GedcomTag.Source, null, SelectionGedcomSource);
    }

    getDestinationSystem() {
        return this.get(GedcomTag.Destination);
    }

    getFileCreationDate() {
        return this.get(GedcomTag.Date, null, SelectionDateExact);
    }

    getLanguage() {
        return this.get(GedcomTag.Language);
    }

    getSubmitterReference() {
        return this.get(GedcomTag.Submitter, null, SelectionSubmitterReference);
    }

    getFilename() {
        return this.get(GedcomTag.File);
    }

    getCopyright() {
        return this.get(GedcomTag.Copyright);
    }
}

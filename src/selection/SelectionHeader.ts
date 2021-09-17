import { SelectionGedcomFile, SelectionCharacterEncoding, SelectionGedcomSource, SelectionDateExact, SelectionSubmitterReference, SelectionAny } from './internal';

import { Tag } from '../tag';

import { SelectionWithNoteMixin } from './mixin';

export class SelectionHeader extends SelectionWithNoteMixin(SelectionAny) {
    getGedcomFile() {
        return this.get(Tag.Gedcom, null, SelectionGedcomFile);
    }

    getCharacterEncoding(): SelectionCharacterEncoding {
        return this.get(Tag.Character);
    }

    getSourceSystem() {
        return this.get(Tag.Source, null, SelectionGedcomSource);
    }

    getDestinationSystem() {
        return this.get(Tag.Destination);
    }

    getFileCreationDate() {
        return this.get(Tag.Date, null, SelectionDateExact);
    }

    getLanguage() {
        return this.get(Tag.Language);
    }

    getSubmitterReference() {
        return this.get(Tag.Submitter, null, SelectionSubmitterReference);
    }

    getFilename() {
        return this.get(Tag.File);
    }

    getCopyright() {
        return this.get(Tag.Copyright);
    }
}

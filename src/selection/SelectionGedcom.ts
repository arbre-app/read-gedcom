/**
 * The root of a Gedcom file.
 * Remark that the actual root is a pseudo node, and hence will store <code>null</code> for the attributes {@link tag}, {@link pointer} and {@link value}.
 */
import { AnyConstructor } from '../meta';
import { GedcomTag } from '../tag';
import { SelectionAny } from './SelectionAny';
import { SelectionFamilyRecord } from './SelectionFamilyRecord';
import { SelectionHeader } from './SelectionHeader';
import { SelectionIndividualRecord } from './SelectionIndividualRecord';
import { SelectionMultimediaRecord } from './SelectionMultimediaRecord';
import { SelectionNoteRecord } from './SelectionNoteRecord';
import { SelectionRecord } from './base';
import { SelectionRepositoryRecord } from './SelectionRepositoryRecord';
import { SelectionSourceRecord } from './SelectionSourceRecord';
import { SelectionSubmitterRecord } from './SelectionSubmitterRecord';

export class SelectionGedcom extends SelectionAny {
    getHeader() {
        return this.get(GedcomTag.Header, null, SelectionHeader);
    }

    getRecord<R extends SelectionRecord>(tag: string | string[] | null, pointer: string | string[] | null, SelectionAdapter: AnyConstructor<R>): R {
        return this.get(tag, pointer, SelectionAdapter);
    }

    getSubmitterRecord(pointer?: string | string[] | null) {
        return this.getRecord(GedcomTag.Submitter, pointer ?? null, SelectionSubmitterRecord);
    }

    getIndividualRecord(pointer?: string | string[] | null) {
        return this.getRecord(GedcomTag.Individual, pointer ?? null, SelectionIndividualRecord);
    }

    getFamilyRecord(pointer?: string | string[] | null) {
        return this.getRecord(GedcomTag.Family, pointer ?? null, SelectionFamilyRecord);
    }

    getMultimediaRecord(pointer?: string | string[] | null) {
        return this.getRecord(GedcomTag.Object, pointer ?? null, SelectionMultimediaRecord);
    }

    getNoteRecord(pointer?: string | string[] | null) {
        return this.getRecord(GedcomTag.Note, pointer ?? null, SelectionNoteRecord);
    }

    getSourceRecord(pointer?: string | string[] | null) {
        return this.getRecord(GedcomTag.Source, pointer ?? null, SelectionSourceRecord);
    }

    getRepositoryRecord(pointer?: string | string[] | null) {
        return this.getRecord(GedcomTag.Repository, pointer ?? null, SelectionRepositoryRecord);
    }

    // TODO
}

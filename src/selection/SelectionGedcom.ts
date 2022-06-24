import { AnyConstructor } from '../meta';
import { Tag } from '../tag';
import { SelectionAny, SelectionFamilyRecord, SelectionHeader, SelectionIndividualRecord, SelectionMultimediaRecord, SelectionNoteRecord, SelectionRepositoryRecord, SelectionSourceRecord, SelectionSubmitterRecord } from './internal';

import { SelectionRecord } from './base';

/**
 * The root of a Gedcom file.
 * Remark that the actual root is a pseudo node, and hence will store <code>null</code> for the attributes {@link tag}, {@link pointer} and {@link value}.
 */
export class SelectionGedcom extends SelectionAny {
    getHeader() {
        return this.get(Tag.Header, null, SelectionHeader);
    }

    /**
     * @deprecated This method does the same thing as {@link get}; use that one instead
     */
    getRecord<R extends SelectionRecord>(tag: string | string[] | null, pointer: string | string[] | null, SelectionAdapter: AnyConstructor<R>): R {
        return this.get(tag, pointer, SelectionAdapter);
    }

    getSubmitterRecord(pointer?: string | string[] | null) {
        return this.get(Tag.Submitter, pointer ?? null, SelectionSubmitterRecord);
    }

    getIndividualRecord(pointer?: string | string[] | null) {
        return this.get(Tag.Individual, pointer ?? null, SelectionIndividualRecord);
    }

    getFamilyRecord(pointer?: string | string[] | null) {
        return this.get(Tag.Family, pointer ?? null, SelectionFamilyRecord);
    }

    getMultimediaRecord(pointer?: string | string[] | null) {
        return this.get(Tag.Object, pointer ?? null, SelectionMultimediaRecord);
    }

    getNoteRecord(pointer?: string | string[] | null) {
        return this.get(Tag.Note, pointer ?? null, SelectionNoteRecord);
    }

    getSourceRecord(pointer?: string | string[] | null) {
        return this.get(Tag.Source, pointer ?? null, SelectionSourceRecord);
    }

    getRepositoryRecord(pointer?: string | string[] | null) {
        return this.get(Tag.Repository, pointer ?? null, SelectionRepositoryRecord);
    }
}

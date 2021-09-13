/**
 * The root of a Gedcom file.
 * Remark that the actual root is a pseudo node, and hence will store <code>null</code> for the attributes {@link tag}, {@link pointer} and {@link value}.
 */
import { AnyConstructor } from '../meta';
import { Tag } from '../tag';
import { SelectionAny, SelectionFamilyRecord, SelectionHeader, SelectionIndividualRecord, SelectionMultimediaRecord, SelectionNoteRecord, SelectionRepositoryRecord, SelectionSourceRecord, SelectionSubmitterRecord } from './internal';

import { SelectionRecord } from './base';

export class SelectionGedcom extends SelectionAny {
    getHeader() {
        return this.get(Tag.Header, null, SelectionHeader);
    }

    // TODO this method does the same thing as `get`, it can be remove
    getRecord<R extends SelectionRecord>(tag: string | string[] | null, pointer: string | string[] | null, SelectionAdapter: AnyConstructor<R>): R {
        return this.get(tag, pointer, SelectionAdapter);
    }

    getSubmitterRecord(pointer?: string | string[] | null) {
        return this.getRecord(Tag.Submitter, pointer ?? null, SelectionSubmitterRecord);
    }

    getIndividualRecord(pointer?: string | string[] | null) {
        return this.getRecord(Tag.Individual, pointer ?? null, SelectionIndividualRecord);
    }

    getFamilyRecord(pointer?: string | string[] | null) {
        return this.getRecord(Tag.Family, pointer ?? null, SelectionFamilyRecord);
    }

    getMultimediaRecord(pointer?: string | string[] | null) {
        return this.getRecord(Tag.Object, pointer ?? null, SelectionMultimediaRecord);
    }

    getNoteRecord(pointer?: string | string[] | null) {
        return this.getRecord(Tag.Note, pointer ?? null, SelectionNoteRecord);
    }

    getSourceRecord(pointer?: string | string[] | null) {
        return this.getRecord(Tag.Source, pointer ?? null, SelectionSourceRecord);
    }

    getRepositoryRecord(pointer?: string | string[] | null) {
        return this.getRecord(Tag.Repository, pointer ?? null, SelectionRepositoryRecord);
    }

    // TODO
}

import { SelectionWithSourceCitationMixin } from './mixin';
import { SelectionRecord } from './base';

export class SelectionNoteRecord extends SelectionWithSourceCitationMixin(SelectionRecord) {}

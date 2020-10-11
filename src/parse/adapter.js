import { Tag } from '../tag';
import { Gedcom } from '../model';

export function createLinks(input) {
    const root = input.children;
    if(!root.length) {
        throw new Error('Empty tree');
    }
    const header = root[0];
    if(header.tag !== Tag.HEADER) {
        throw new Error(`First node is not a header (got ${header.tag})`);
    }
    const trailer = root[root.length - 1];
    if(trailer.tag !== Tag.TRAILER) {
        throw new Error(`Last node is not a trailer (got ${trailer.tag})`);
    }

    const gedcom = new Gedcom(input);
    gedcom._createRecordBindings();
    return gedcom;
}

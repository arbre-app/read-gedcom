import { GedcomReadingOptions, parseGedcom } from '../parse';
import { TreeNodeRoot } from '../tree';
import { SelectionGedcom } from './internal';

/**
 * Parses a Gedcom file with {@link parseGedcom} and wraps the result in a {@link SelectionGedcom}.
 * @param buffer The content of the file
 * @param options Optional parameters
 */
export const readGedcom = (buffer: ArrayBuffer, options: GedcomReadingOptions = {}): SelectionGedcom => {
    const rootNode = parseGedcom(buffer, options);

    return new SelectionGedcom(rootNode, [rootNode]);
};

/**
 * Wrap a Gedcom tree into a {@link SelectionGedcom}.
 * @param rootNode The Gedcom tree
 */
export const selectGedcom = (rootNode: TreeNodeRoot): SelectionGedcom => new SelectionGedcom(rootNode, [rootNode]);

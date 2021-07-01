import { GedcomTreeReadingOptions, parseGedcom } from '../parse';
import { SelectionGedcom } from './SelectionGedcom';

/**
 * Parses a Gedcom file with {@link parseGedcom} and wraps the result in a {@link GedcomSelection.Gedcom}.
 * @param buffer The content of the file
 * @param options Optional parameters
 */
export const readGedcom = (buffer: ArrayBuffer, options: GedcomTreeReadingOptions = {}): SelectionGedcom => {
    const rootNode = parseGedcom(buffer, options);

    return new SelectionGedcom(rootNode, [rootNode]);
};

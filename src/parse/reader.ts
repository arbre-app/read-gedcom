import {detectCharset, FileEncoding} from "./decoder";
import {decodeAnsel, decodeCp1252, decodeCp850, decodeMacintosh, decodeUtf8} from "./decoding";
import {tokenize} from "./tokenizer";
import {buildTree} from "./structurer";
import {GedcomSelection} from "../selection";
import {GedcomTree} from '../tree';
import {GedcomTag} from "../tag";
import {indexTree} from "./indexer";
import {SelectionGedcom} from "../selection/Selection";
import {GedcomTreeReadingOptions} from "./GedcomTreeReadingOptions"; // Required to do it that way, for obscure reasons


/**
 * Reads a Gedcom file with {@link readGedcomAsNode} and wraps the result in a {@link GedcomSelection.Gedcom}.
 * @param buffer The content of the file
 * @param options Optional parameters
 */
export const readGedcom = (buffer: ArrayBuffer, options: GedcomTreeReadingOptions = {}): GedcomSelection.Gedcom => {
    const rootNode = readGedcomAsNode(buffer, options);

    return new SelectionGedcom(rootNode, [rootNode]);
}

/**
 * Reads a Gedcom file and returns it as a tree representation.
 * @param buffer The content of the file
 * @param options Optional parameters
 */
export const readGedcomAsNode = (buffer: ArrayBuffer, options: GedcomTreeReadingOptions = {}): GedcomTree.NodeRoot => {
    const charset = detectCharset(buffer);

    let input;
    if(charset === FileEncoding.Utf8) {
        input = decodeUtf8(buffer);
    } else if(charset === FileEncoding.Cp1252) {
        input = decodeCp1252(buffer);
    } else if(charset === FileEncoding.Ansel) {
        input = decodeAnsel(buffer);
    } else if(charset === FileEncoding.Macintosh) {
        input = decodeMacintosh(buffer);
    } else if(charset === FileEncoding.Cp850) {
        input = decodeCp850(buffer);
    } else {
        throw new Error(`Unrecognized charset: ${charset}`);
    }

    const tokensIterator = tokenize(input);
    const rootNode = buildTree(tokensIterator, !!options.noInlineContinuations);

    checkTreeStructure(rootNode);

    if(!options.noIndex) {
        indexTree(rootNode, options.noBackwardsReferencesIndex);
    }

    return rootNode;
}

/**
 * A simple procedure verifying that the root node starts with a {@link GedcomTag.Header} and ends with a {@link GedcomTag.Trailer}.
 * @param rootNode The root node
 */
const checkTreeStructure = (rootNode: GedcomTree.NodeRoot): void => {
    const root = rootNode.children;
    if(!root.length) {
        throw new Error('Empty tree');
    }
    const header = root[0];
    if(header.tag !== GedcomTag.Header) {
        throw new Error(`First node is not a header (got ${header.tag})`);
    }
    const trailer = root[root.length - 1];
    if(trailer.tag !== GedcomTag.Trailer) {
        throw new Error(`Last node is not a trailer (got ${trailer.tag})`);
    }
}

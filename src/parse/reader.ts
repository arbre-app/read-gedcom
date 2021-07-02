import { GedcomTag } from '../tag';
import { GedcomTree } from '../tree';
import { detectCharset, FileEncoding } from './decoder';
import { decodeAnsel, decodeCp1252, decodeCp850, decodeMacintosh, decodeUtf8 } from './decoding';
import { GedcomError } from './error';
import { GedcomReadingOptions } from './GedcomReadingOptions';
import { GedcomReadingPhase } from './GedcomReadingPhase';
import { indexTree } from './indexer';
import { buildTree } from './structurer';
import { tokenize } from './tokenizer';

/**
 * Reads a Gedcom file and returns it as a tree representation.
 * @param buffer The content of the file
 * @param options Optional parameters
 * @throws GedcomError.ParseError If the file cannot be interpreted correctly
 */
export const parseGedcom = (buffer: ArrayBuffer, options: GedcomReadingOptions = {}): GedcomTree.NodeRoot => {
    const charset = detectCharset(buffer);

    const callback = options.progressCallback;

    const totalBytes = buffer.byteLength;
    const decodingCallback = callback ? (bytesRead: number) => callback(GedcomReadingPhase.Decoding, bytesRead / totalBytes) : undefined;
    let input;
    if (charset === FileEncoding.Utf8) {
        input = decodeUtf8(buffer, decodingCallback);
    } else if (charset === FileEncoding.Cp1252) {
        input = decodeCp1252(buffer, decodingCallback);
    } else if (charset === FileEncoding.Ansel) {
        input = decodeAnsel(buffer, decodingCallback);
    } else if (charset === FileEncoding.Macintosh) {
        input = decodeMacintosh(buffer, decodingCallback);
    } else if (charset === FileEncoding.Cp850) {
        input = decodeCp850(buffer, decodingCallback);
    } else {
        throw new GedcomError.UnsupportedCharsetError(`Unsupported charset: ${charset}`, charset);
    }

    const totalChars = input.length;

    const tokensIterator = tokenize(input);
    const rootNode = buildTree(tokensIterator, !!options.noInlineContinuations, callback ? charsRead => callback(GedcomReadingPhase.TokenizationAndStructuring, charsRead / totalChars) : null);

    checkTreeStructure(rootNode);

    if (!options.noIndex) {
        indexTree(rootNode, !!options.noBackwardsReferencesIndex, callback ? () => callback(GedcomReadingPhase.Indexing, null) : null);
    }

    return rootNode;
};

/**
 * A simple procedure verifying that the root node starts with a {@link GedcomTag.Header} and ends with a {@link GedcomTag.Trailer}.
 * @param rootNode The root node
 */
const checkTreeStructure = (rootNode: GedcomTree.NodeRoot): void => {
    const root = rootNode.children;
    if (root.length === 0) {
        throw new GedcomError.EmptyTreeError('The tree is empty');
    }
    const header = root[0];
    if (header.tag !== GedcomTag.Header) {
        throw new GedcomError.TreeStructureError(`First node is not a header (got ${header.tag})`);
    }
    const trailer = root[root.length - 1];
    if (trailer.tag !== GedcomTag.Trailer) {
        throw new GedcomError.TreeStructureError(`Last node is not a trailer (got ${trailer.tag})`);
    }
};

import { Tag } from '../tag';
import { TreeNodeRoot } from '../tree';
import { detectCharset, FileEncoding } from './decoder';
import {
    BOM_UTF16_BE,
    BOM_UTF16_LE,
    BOM_UTF32_BE,
    BOM_UTF32_LE,
    BOM_UTF8,
    decodeAnsel,
    decodeCp1252,
    decodeCp850,
    decodeMacintosh,
    decodeUtf,
} from './decoding';
import { ErrorEmptyTree, ErrorInvalidFileType, ErrorTreeStructure, ErrorUnsupportedCharset } from './error';
import { GedcomReadingOptions } from './GedcomReadingOptions';
import { GedcomReadingPhase } from './GedcomReadingPhase';
import { indexTree } from './indexer';
import { buildTree } from './structurer';
import { tokenize } from './tokenizer';

/**
 * Reads a Gedcom file and returns it as a tree representation.
 * @param buffer The content of the file
 * @param options Optional parameters
 * @throws ErrorParse If the file cannot be interpreted correctly
 * @category Gedcom parser
 */
export const parseGedcom = (buffer: ArrayBuffer, options: GedcomReadingOptions = {}): TreeNodeRoot => {
    checkMagicHeader(buffer);

    const charset: FileEncoding = options.forcedCharset == null ? detectCharset(buffer) : options.forcedCharset;

    const callback = options.progressCallback;

    const totalBytes = buffer.byteLength;
    const decodingCallback = callback ? (bytesRead: number) => callback(GedcomReadingPhase.Decoding, bytesRead / totalBytes) : undefined;
    let input;
    if (charset === FileEncoding.Utf8 || charset === FileEncoding.Utf16be || charset === FileEncoding.Utf16le) {
        input = decodeUtf(buffer, decodingCallback);
    } else if (charset === FileEncoding.Cp1252) {
        input = decodeCp1252(buffer, decodingCallback);
    } else if (charset === FileEncoding.Ansel) {
        input = decodeAnsel(buffer, decodingCallback);
    } else if (charset === FileEncoding.Macintosh) {
        input = decodeMacintosh(buffer, decodingCallback);
    } else if (charset === FileEncoding.Cp850) {
        input = decodeCp850(buffer, decodingCallback);
    } else {
        throw new ErrorUnsupportedCharset(`Unsupported charset: ${charset}`, charset);
    }

    const totalChars = input.length;

    const tokensIterator = tokenize(input);
    const rootNode = buildTree(tokensIterator, !!options.noInlineContinuations, callback ? charsRead => callback(GedcomReadingPhase.TokenizationAndStructuring, charsRead / totalChars) : null);

    checkTreeStructure(rootNode);

    if (!options.noIndex) {
        indexTree(rootNode, !!options.noBackwardsReferencesIndex, !!options.doHideIndex, callback ? () => callback(GedcomReadingPhase.Indexing, null) : null);
    }

    if (options.doFreeze) {
        deepFreeze(rootNode);
    }

    return rootNode;
};

/**
 * A simple and fast testing procedure to eliminate files that are clearly not Gedcoms.
 * @param buffer The content of the file
 */
const checkMagicHeader = (buffer: ArrayBuffer) => {
    const headStr = '0 HEAD';
    const head: number[] = [];
    for (let i = 0; i < headStr.length; i++) {
        head.push(headStr.charCodeAt(i));
    }
    const byteBuffer = new Uint8Array(buffer);
    const startsWith = (bytes: number[]) => {
        if (byteBuffer.byteLength < bytes.length) {
            return false;
        }
        for (let i = 0; i < bytes.length; i++) {
            if (bytes[i] !== byteBuffer[i]) {
                return false;
            }
        }
        return true;
    };

    if (!startsWith(head) && !startsWith(BOM_UTF8.concat(head))) { // Not ASCII nor any of its extensions, including UTF-8
        const headUtf16 = head.map(b => [0, b]);
        if (!startsWith(BOM_UTF16_BE.concat(headUtf16.flat())) &&
            !startsWith(BOM_UTF16_LE.concat(headUtf16.map(bs => bs.slice().reverse()).flat()))) { // Not UTF-16
            const headUtf32 = head.map(b => [0, 0, 0, b]);
            if (!startsWith(BOM_UTF32_BE.concat(headUtf32.flat())) &&
                !startsWith(BOM_UTF32_LE.concat(headUtf32.map(bs => bs.slice().reverse()).flat()))) { // Not UTF-32
                throw new ErrorInvalidFileType('Probably not a Gedcom file');
            }
        }
    }
};

/**
 * A simple procedure verifying that the root node starts with a {@link Tag.Header} and ends with a {@link Tag.Trailer}.
 * @param rootNode The root node
 */
const checkTreeStructure = (rootNode: TreeNodeRoot): void => {
    const root = rootNode.children;
    if (root.length === 0) {
        throw new ErrorEmptyTree('The tree is empty');
    }
    const header = root[0];
    if (header.tag !== Tag.Header) {
        throw new ErrorTreeStructure(`First node is not a header (got ${header.tag})`);
    }
    const trailer = root[root.length - 1];
    if (trailer.tag !== Tag.Trailer) {
        throw new ErrorTreeStructure(`Last node is not a trailer (got ${trailer.tag})`);
    }
};

/**
 * Freezes this object to prevent further modifications.
 * @param object The object to be frozen
 */
const deepFreeze = (object: any): void => {
    let queue = [object];
    while (queue.length > 0) {
        const next: any[] = [];
        queue.forEach(obj => {
            if (obj != null && typeof obj === 'object' && !Object.isFrozen(obj)) {
                Object.freeze(obj);
                Object.getOwnPropertyNames(obj).forEach(property => next.push(obj[property]));
            }
        });
        queue = next;
    }
};

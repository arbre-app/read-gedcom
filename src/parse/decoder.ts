import { TagNonStandard, Tag } from '../tag';
import { ValueCharacterEncoding } from '../value';
import { tokenize } from './tokenizer';
import { buildTree } from './structurer';
import { decodeUtfBOM } from './decoding';

/**
 * Supported Gedcom file encoding schemes.
 */
export enum FileEncoding {
    Utf8 = 'UTF-8',
    Ansel = 'ANSEL',
    Cp1252 = 'Cp1252',
    Macintosh = 'Macintosh',
    Cp850 = 'Cp850',
    Utf16be = 'UTF-16be',
    Utf16le = 'UTF-16le',
}

/**
 * Early detectable file metadata.
 * Can be used to infer the file encoding with high confidence.
 */
export interface FileMetadata {
    /**
     * The source encoding value, as defined in the header.
     */
    sourceEncoding: string | null;
    /**
     * The source provider value, as defined in the header.
     */
    sourceProvider: string | null;
    /**
     * The source provider's version value, as defined in the header.
     */
    sourceProviderVersion: string | null;
    /**
     * Whether this file contains a byte order marker (BOM).
     */
    fileHasBOM: boolean;
}

/**
 * Extracts the file metadata (see {@link FileMetadata}). The metadata can then be used to guess the actual charset of the file.
 * To circumvent the bootstrapping problem this function restricts its reading to the first lines of the file only, and
 * decodes them as UTF-8.
 * @param buffer The content of the file
 * @param maxPeekBytes Maximum number of bytes to read
 * @param maxPeekLines Maximum number of lines to read
 */
export const getFileMetadata = (buffer: ArrayBuffer, maxPeekBytes = 5000, maxPeekLines = 200): FileMetadata => {
    const { output: inputHead, bomCharset } = decodeUtfBOM(buffer.slice(0, maxPeekBytes)); // Start with UTF-8 since file can contain a BOM

    const hasBOM = bomCharset !== null;

    const it = tokenize(inputHead, false); // Non-strict mode: break silently on error
    let i = 0;
    const array = [];
    for (const line of it) {
        if (i >= maxPeekLines) {
            break;
        }
        array.push(line);
        i += 1;
    }
    const tree = buildTree(array);
    const header = tree.children.filter(c => c.tag === Tag.Header);
    const char = header.flatMap(c => c.children.filter(n => n.tag === Tag.Character || n.tag === TagNonStandard.CharacterAlt));
    const charOpt = char.length > 0 ? char[0].value : null;
    const source = header.flatMap(c => c.children.filter(n => n.tag === Tag.Source));
    const sourceOpt = source.length > 0 ? source[0].value : null;
    const version = source.flatMap(c => c.children.filter(n => n.tag === Tag.Version));
    const versionOpt = version.length > 0 ? version[0].value : null;

    return { sourceEncoding: charOpt, sourceProvider: sourceOpt, sourceProviderVersion: versionOpt, fileHasBOM: hasBOM };
};

/**
 * Detects the file charset using a set of heuristics. Has proven to work great in practice.
 * If you encounter a file for which this procedure doesn't work as intended please do open an issue
 * at: https://github.com/arbre-app/read-gedcom/issues.
 * @param buffer The content of the file
 */
export const detectCharset = (buffer: ArrayBuffer): FileEncoding => {
    // eslint-disable-next-line
    const { sourceEncoding, sourceProvider, sourceProviderVersion, fileHasBOM } = getFileMetadata(buffer);

    // Estimate an encoding without knowing the provider
    function estimateEncoding() {
        if (sourceEncoding === ValueCharacterEncoding.Utf8) {
            return FileEncoding.Utf8;
        } else if (sourceEncoding === ValueCharacterEncoding.Ansel) {
            return FileEncoding.Ansel;
        } else if (sourceEncoding === ValueCharacterEncoding.Ascii) {
            return FileEncoding.Cp1252;
        } else if (sourceEncoding === ValueCharacterEncoding.Ansi) {
            return FileEncoding.Cp1252;
        } else if (sourceEncoding === ValueCharacterEncoding.Unicode) {
            return FileEncoding.Utf16be; // RFC 2781
        } else if (sourceEncoding === 'WINDOWS' || sourceEncoding === 'IBM WINDOWS') {
            return FileEncoding.Cp1252;
        } else if (sourceEncoding === 'MACINTOSH') {
            return FileEncoding.Macintosh;
        } else if (sourceEncoding === 'IBMPC') {
            return FileEncoding.Cp850;
        } else if (sourceEncoding === 'MSDOS') {
            return FileEncoding.Cp850;
        } else if (sourceEncoding === 'UNIX') {
            return FileEncoding.Cp1252;
        } else if (sourceEncoding === 'UTF8') { // Spelling mistake
            return FileEncoding.Utf8;
        } else if (sourceEncoding === 'windows-1250') { // Our best guess (Rodokmen Pro)
            return FileEncoding.Cp1252;
        } else { // Unknown encoding
            return FileEncoding.Utf8; // Defaults to UTF-8
        }
    }

    if (fileHasBOM) { // Short-circuit: must be one of UTF-{8,16,32}
        return FileEncoding.Utf8;
    }

    if (sourceProvider === 'GeneWeb') { // Geneweb
        if (sourceEncoding === ValueCharacterEncoding.Ascii) {
            return FileEncoding.Cp1252;
        } else if (sourceEncoding === ValueCharacterEncoding.Utf8) {
            return FileEncoding.Utf8;
        } else {
            return estimateEncoding();
        }
    } else if (sourceProvider != null && sourceProvider.startsWith('HEREDIS')) { // Heredis
        if (sourceEncoding === ValueCharacterEncoding.Ansi) {
            return FileEncoding.Cp1252;
        } else {
            return estimateEncoding();
        }
    } else if (sourceProvider === 'GENEATIQUE') { // Généatique
        if (sourceEncoding === ValueCharacterEncoding.Ansel) {
            return FileEncoding.Ansel;
        } else {
            return estimateEncoding();
        }
    } else if (sourceProvider === 'Gramps') { // Gramps
        if (sourceEncoding === ValueCharacterEncoding.Utf8) {
            return FileEncoding.Utf8;
        } else {
            return estimateEncoding();
        }
    } else { // Unknown provider
        return estimateEncoding();
    }
};

import { Tag } from '../tag';
import { tokenize } from './tokenizer';
import { makeTree } from './structurer';
import { Gedcom, CharacterEncoding } from '../model';
import { decodeUtf8BOM } from './decoding';

export class FileEncoding {
    static UTF_8 = 'UTF-8';
    static ANSEL = 'ANSEL';
    static CP1252 = 'Cp1252';
    static MACINTOSH = 'Macintosh';
    static CP850 = 'Cp850';
}

function getFileMetadata(buffer) {
    const maxPeekBytes = 1000;
    const [inputHead, hasBOM] = decodeUtf8BOM(buffer.slice(0, maxPeekBytes)); // Start with UTF-8 since file can contain a BOM

    const it = tokenize(inputHead, false); // Non-strict mode: break silently on error
    let i = 0;
    const maxPeekLines = 100;
    const array = [];
    for(let line of it) {
        if(i >= maxPeekLines) {
            break;
        }
        array.push(line);
        i += 1;
    }
    const tree = makeTree(array);
    const gedcom = new Gedcom([tree]); // Bypass checks
    const header = gedcom.getHeader();
    const charOpt = header.get([Tag.CHARACTER, Tag.CHARACTER_ALT]).value().option();
    const source = header.getSourceSystem();
    const sourceOpt = source.value().option();
    const versionOpt = source.getVersion().value().option();

    return { sourceEncoding: charOpt, sourceProvider: sourceOpt, sourceProviderVersion: versionOpt, fileHasBOM: hasBOM };
}

export function detectCharset(buffer) {
    const { sourceEncoding, sourceProvider, sourceProviderVersion, fileHasBOM } = getFileMetadata(buffer);

    // Estimate an encoding without knowing the provider
    function estimateEncoding() {
        if(sourceEncoding === CharacterEncoding.UTF_8) {
            return FileEncoding.UTF_8;
        } else if(sourceEncoding === CharacterEncoding.ANSEL) {
            return FileEncoding.ANSEL;
        } else if(sourceEncoding === CharacterEncoding.ASCII) {
            return FileEncoding.CP1252;
        } else if(sourceEncoding === CharacterEncoding.ANSI) {
            return FileEncoding.CP1252;
        } else if(sourceEncoding === 'WINDOWS') {
            return FileEncoding.CP1252;
        } else if(sourceEncoding === 'MACINTOSH') {
            return FileEncoding.MACINTOSH;
        } else if(sourceEncoding === 'IBMPC') {
            return FileEncoding.CP850;
        } else if(sourceEncoding === 'MSDOS') {
            return FileEncoding.CP850;
        } else if(sourceEncoding === 'UNIX') {
            return FileEncoding.CP1252;
        } else if(sourceEncoding === 'UTF8') { // Spelling mistake
            return FileEncoding.UTF_8;
        } else { // Unknown encoding
            return FileEncoding.UTF_8; // Defaults to UTF-8
        }
    }

    if(fileHasBOM) { // Short-circuit: must be one of UTF-{8,16,32}
        return FileEncoding.UTF_8;
    }

    if(sourceProvider === 'GeneWeb') { // Geneweb
        if(sourceEncoding === CharacterEncoding.ASCII) {
            return FileEncoding.CP1252;
        } else if(sourceEncoding === CharacterEncoding.UTF_8) {
            return FileEncoding.UTF_8;
        } else {
            return estimateEncoding();
        }
    } else if(sourceProvider != null && sourceProvider.startsWith('HEREDIS')) { // Heredis
        if(sourceEncoding === CharacterEncoding.ANSI) {
            return FileEncoding.CP1252;
        } else {
            return estimateEncoding();
        }
    } else if(sourceProvider === 'GENEATIQUE') { // Généatique
        if(sourceEncoding === CharacterEncoding.ANSEL) {
            return FileEncoding.ANSEL;
        } else {
            return estimateEncoding();
        }
    } else if(sourceProvider === 'Gramps') { // Gramps
        if(sourceEncoding === CharacterEncoding.UTF_8) {
            return FileEncoding.UTF_8;
        } else {
            return estimateEncoding();
        }
    } else { // Unknown provider
        return estimateEncoding();
    }
}

import { Tag } from '../tag';
import { tokenize } from './tokenizer';
import { makeTree } from './structurer';
import { Gedcom, CharacterEncoding } from '../model';
import { decodeCp1252 } from './decoding';

export class FileEncoding {
    static UTF_8 = 'UTF-8';
    static ANSEL = 'ANSEL';
    static CP1252 = 'Cp1252';
}

function getFileMetadata(buffer) {
    const maxPeekBytes = 1000;
    const inputHead = decodeCp1252(buffer.slice(0, maxPeekBytes));

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

    return { sourceEncoding: charOpt, sourceProvider: sourceOpt, sourceProviderVersion: versionOpt };
}

export function detectCharset(buffer) {
    const { sourceEncoding, sourceProvider, sourceProviderVersion } = getFileMetadata(buffer);

    // Estimate an encoding without knowing the provider
    function estimateEncoding() {
        if(sourceEncoding === CharacterEncoding.UTF_8) {
            return FileEncoding.UTF_8;
        } else if(sourceEncoding === CharacterEncoding.ANSEL) {
            return FileEncoding.ANSEL;
        } else if(sourceEncoding === CharacterEncoding.ASCII) {
            return FileEncoding.CP1252;
        } else { // Unknown encoding
            return FileEncoding.UTF_8; // Defaults to UTF-8
        }
    }

    if(sourceProvider === 'GeneWeb') { // Geneweb
        if(sourceEncoding === CharacterEncoding.ASCII) {
            return FileEncoding.CP1252;
        } else if(sourceEncoding === CharacterEncoding.UTF_8) {
            return FileEncoding.UTF_8;
        } else {
            return estimateEncoding();
        }
    } else if(sourceProvider !== null && sourceProvider.startsWith('HEREDIS')) { // Heredis
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

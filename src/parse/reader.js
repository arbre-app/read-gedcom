import { tokenize } from './tokenizer';
import { makeTree } from './structurer';
import { createLinks } from './adapter';
import { detectCharset, FileEncoding } from './decoder';
import { decodeUtf8, decodeCp1252, decodeAnsel, decodeMacintosh, decodeCp850 } from './decoding';

/**
 * Reads a gedcom file and returns a traversable model
 * @param buffer {Buffer} a buffer
 * @returns {Gedcom} a model representing the parsed file
 */
export function readGedcom(buffer) {
    const charset = detectCharset(buffer);

    let input;
    if(charset === FileEncoding.UTF_8) {
        input = decodeUtf8(buffer);
    } else if(charset === FileEncoding.CP1252) {
        input = decodeCp1252(buffer);
    } else if(charset === FileEncoding.ANSEL) {
        input = decodeAnsel(buffer);
    } else if(charset === FileEncoding.MACINTOSH) {
        input = decodeMacintosh(buffer);
    } else if(charset === FileEncoding.CP850) {
        input = decodeCp850(buffer);
    } else {
        throw new Error(`Unrecognized charset: ${charset}`);
    }

    const it = tokenize(input);

    const array = [];
    for(let line of it) {
        array.push(line);
    }

    const res = makeTree(array);
    return createLinks(res);
}

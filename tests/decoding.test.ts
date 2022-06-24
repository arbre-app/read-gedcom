import fs from 'fs';
import { describe, it } from 'mocha';
import { assert } from 'chai';
import { TextDecoder } from 'util';
import { readGedcom, Tag, ValueCharacterEncoding } from '../src';
import { BOM_UTF16_BE, BOM_UTF16_LE, BOM_UTF8 } from '../src/parse/decoding';

describe('Detect the encoding and decode it accordingly', () => {
    type FileBuilderOptions = { charset: ValueCharacterEncoding | string, bom?: number[], reencode?: string };

    const buildFileBuffer = (textEncoded: number[], options: FileBuilderOptions) => {
        let allBytes = [
            `0 ${Tag.Header}`,
            `1 ${Tag.Character} ${options.charset}`,
            `0 @N1@ ${Tag.Note} `, // Will be inserted here
            `0 ${Tag.Trailer}`,
        ].map((line, i) => {
            const bytes = [];
            const buffer = new Uint8Array(Buffer.from(line));
            bytes.push(...buffer);
            if (i === 2) { // Magic!
                bytes.push(...textEncoded);
            }
            bytes.push('\n'.charCodeAt(0));
            return bytes;
        }).flat();
        if (options.reencode !== undefined) {
            const buffer = Buffer.from(allBytes);
            let isBe: boolean;
            if (options.reencode.endsWith('be')) {
                isBe = true;
            } else if (options.reencode.endsWith('le')) {
                isBe = false;
            } else {
                throw new Error();
            }
            const toBytes = (b: number, n: number) => {
                const bytes = [];
                for (let i = 0; i < n; i++) {
                    bytes.push(b & 0xff);
                    b >>>= 8;
                }
                return isBe ? bytes.slice().reverse() : bytes;
            };
            const newBytes = [];
            if (options.reencode.startsWith('utf-16')) {
                const decoderUtf8 = new TextDecoder('utf-8');
                const string = decoderUtf8.decode(buffer);
                for (let i = 0; i < string.length; i++) {
                    newBytes.push(...toBytes(string.charCodeAt(i), 2));
                }
            } else {
                throw new Error();
            }
            allBytes = newBytes;
        }
        if (options.bom !== undefined) {
            allBytes.unshift(...options.bom);
        }
        return new Uint8Array(allBytes);
    };

    const test = (textEncoded: number[], textDecoded: string, options: FileBuilderOptions) => {
        const fileBuffer = buildFileBuffer(textEncoded, options);
        const gedcom = readGedcom(fileBuffer);
        assert(gedcom.getNoteRecord().value()[0] === textDecoded);
    };

    it('should decode and parse generated files in the allowed charsets', () => {
        const decoded = 'aéôå';
        const utf8Decoded = [...new Uint8Array(Buffer.from(decoded))];

        test(utf8Decoded, decoded, { charset: ValueCharacterEncoding.Utf8 }); // UTF-8
        [ValueCharacterEncoding.Ascii, ValueCharacterEncoding.Ansi].forEach(charset =>
            test([0x61, 0xe9, 0xf4, 0xe5], decoded, { charset })); // ASCII / CP1252
        test([0x61, 0x82, 0x93, 0x86], decoded, { charset: 'MSDOS' }); // CP850
        test([0x61, ...[0xe2, 0x65], ...[0xe3, 0x6f], ...[0xea, 0x61]], decoded, { charset: ValueCharacterEncoding.Ansel }); // ANSEL
        test([0x61, 0x8e, 0x99, 0x8c], decoded, { charset: 'MACINTOSH' }); // Macintosh Latin
        test(utf8Decoded, decoded, { charset: ValueCharacterEncoding.Utf8, bom: BOM_UTF8 }); // UTF-8 BOM
        test(utf8Decoded, decoded, { charset: ValueCharacterEncoding.Unicode, bom: BOM_UTF16_BE, reencode: 'utf-16be' }); // UTF-16 BOM Big-endian
        test(utf8Decoded, decoded, { charset: ValueCharacterEncoding.Unicode, bom: BOM_UTF16_LE, reencode: 'utf-16le' }); // UTF-16 BOM Little-endian
    });

    it('should parse known files in UTF-16', () => {
        const filenames = ['sample55516be.ged', 'sample55516le.ged'];
        filenames.forEach(filename => {
            const buffer = fs.readFileSync(`./tests/data/${filename}`);
            assert(readGedcom(buffer).getSubmitterRecord().getName().value()[0] === 'Reldon Poulson');
        });
    });
});

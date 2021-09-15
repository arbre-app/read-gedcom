import { ErrorUnsupportedCharset } from '../error';
import { BYTES_INTERVAL } from './common';
import { FileDecoder } from './FileDecoder';

export const BOM_UTF8 = [0xef, 0xbb, 0xbf];
export const BOM_UTF16_BE = [0xfe, 0xff];
export const BOM_UTF16_LE = BOM_UTF16_BE.slice().reverse();
// These are not part of the specification
export const BOM_UTF32_BE = [0x00, 0x00, 0xfe, 0xff];
export const BOM_UTF32_LE = BOM_UTF32_BE.slice().reverse();

export const DECODE_UTF8 = 'utf-8';
export const DECODE_UTF16_BE = 'utf-16be';
export const DECODE_UTF16_LE = 'utf-16le';

export const decodeUtf: FileDecoder = (buffer, progressCallback?) => {
    const { output } = decodeUtfBOM(buffer, progressCallback);
    return output;
};

export const decodeUtf8: FileDecoder = (buffer, progressCallback?) => {
    if (progressCallback) {
        progressCallback(0);
    }

    let outputView = '';
    const byteBuffer = new Uint8Array(buffer);
    let nIdx = 0;
    for (let nPart, nLen = byteBuffer.length; nIdx < nLen; nIdx++) {
        nPart = byteBuffer[nIdx];

        outputView += String.fromCharCode(
            nPart > 251 && nPart < 254 && nIdx + 5 < nLen /* six bytes */
                /* (nPart - 252 << 30) may be not so safe in ECMAScript! So...: */
                ? (nPart - 252) * 1073741824 + (byteBuffer[++nIdx] - 128 << 24) + (byteBuffer[++nIdx] - 128 << 18) + (byteBuffer[++nIdx] - 128 << 12) + (byteBuffer[++nIdx] - 128 << 6) + byteBuffer[++nIdx] - 128
                : nPart > 247 && nPart < 252 && nIdx + 4 < nLen /* five bytes */
                    ? (nPart - 248 << 24) + (byteBuffer[++nIdx] - 128 << 18) + (byteBuffer[++nIdx] - 128 << 12) + (byteBuffer[++nIdx] - 128 << 6) + byteBuffer[++nIdx] - 128
                    : nPart > 239 && nPart < 248 && nIdx + 3 < nLen /* four bytes */
                        ? (nPart - 240 << 18) + (byteBuffer[++nIdx] - 128 << 12) + (byteBuffer[++nIdx] - 128 << 6) + byteBuffer[++nIdx] - 128
                        : nPart > 223 && nPart < 240 && nIdx + 2 < nLen /* three bytes */
                            ? (nPart - 224 << 12) + (byteBuffer[++nIdx] - 128 << 6) + byteBuffer[++nIdx] - 128
                            : nPart > 191 && nPart < 224 && nIdx + 1 < nLen /* two bytes */
                                ? (nPart - 192 << 6) + byteBuffer[++nIdx] - 128
                                : /* nPart < 127 ? */ /* one byte */ nPart);

        if (progressCallback && nIdx % BYTES_INTERVAL === 0) {
            progressCallback(nIdx);
        }
    }

    if (progressCallback) {
        progressCallback(nIdx);
    }

    return outputView;
};

const decodeUtf16 = (buffer: ArrayBuffer, isBe: boolean, progressCallback?: (bytesRead: number) => void): string => {
    if (progressCallback) {
        progressCallback(0);
    }

    let outputView = '';
    const byteBuffer = new Uint8Array(buffer);
    for (let i = 0; i < byteBuffer.length; i += 2) {
        const a = byteBuffer[i], b = byteBuffer[i + 1];
        const code = isBe ? a * 16 + b : b * 16 + a;
        outputView += String.fromCharCode(code);

        if (progressCallback && ((i + 1) / 2) % BYTES_INTERVAL === 0) {
            progressCallback(i);
        }
    }

    return outputView;
};

export const decodeUtf16be: FileDecoder = (buffer, progressCallback?) => decodeUtf16(buffer, true, progressCallback);

export const decodeUtf16le: FileDecoder = (buffer, progressCallback?) => decodeUtf16(buffer, false, progressCallback);

export const decodeUtfBOM = (buffer: ArrayBuffer, progressCallback?: (bytesRead: number) => void): ({ output: string, bomCharset: string | null }) => {
    if (progressCallback) {
        progressCallback(0);
    }

    const byteBuffer = new Uint8Array(buffer);

    const startsWith = (bom: number[]) => {
        if (byteBuffer.length < bom.length) {
            return false;
        }
        for (let i = 0; i < bom.length; i++) {
            if (byteBuffer[i] !== bom[i]) {
                return false;
            }
        }
        return true;
    };

    const boms: [string, number[]][] =
        [[DECODE_UTF8, BOM_UTF8], [DECODE_UTF16_BE, BOM_UTF16_BE], [DECODE_UTF16_LE, BOM_UTF16_LE]];
    const optional = boms.map(([charset, bom]) => ({ charset, bom })).find(({ bom }) => startsWith(bom));

    if ([BOM_UTF32_BE, BOM_UTF32_LE].some(bom => startsWith(bom))) {
        throw new ErrorUnsupportedCharset(`Unsupported charset detected from BOM: 'utf-32'`, 'utf-32');
    }

    const bomCharset = optional !== undefined ? optional.charset : null;
    const byteBufferWithoutBOM = optional !== undefined ? byteBuffer.slice(optional.bom.length) : byteBuffer;
    const charset = bomCharset !== null ? bomCharset : DECODE_UTF8; // No BOM = defaults to UTF-8

    let output;
    if (charset === DECODE_UTF8) {
        output = decodeUtf8(byteBufferWithoutBOM);
    } else if (charset === DECODE_UTF16_BE) {
        output = decodeUtf16be(byteBufferWithoutBOM);
    } else if (charset === DECODE_UTF16_LE) {
        output = decodeUtf16le(byteBufferWithoutBOM);
    } else {
        throw new Error();
    }

    if (progressCallback) {
        progressCallback(byteBuffer.length);
    }

    return { output, bomCharset };
};

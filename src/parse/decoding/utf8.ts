import { BYTES_INTERVAL } from './common';
import { FileDecoder } from './FileDecoder';

export const decodeUtf8: FileDecoder = (buffer, progressCallback?) => {
    const [output, _] = decodeUtf8BOM(buffer, progressCallback); // eslint-disable-line
    return output;
};

export const decodeUtf8BOM = (buffer: ArrayBuffer, progressCallback?: (bytesRead: number) => void): [string, boolean] => {
    if (progressCallback) {
        progressCallback(0);
    }

    const byteBuffer = new Uint8Array(buffer);
    let outputView = '';

    let nIdx = 0;
    let hasBOM = false;
    if (byteBuffer[0] === 239 && byteBuffer[1] === 187 && byteBuffer[2] === 191) { // UTF-8 BOM
        nIdx += 3;
        hasBOM = true;
    }

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

    return [outputView, hasBOM];
};

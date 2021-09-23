/**
 * The signature of a decoder.
 */
export type FileDecoder = (buffer: ArrayBuffer, progressCallback?: (bytesRead: number) => void, strict?: boolean) => string;

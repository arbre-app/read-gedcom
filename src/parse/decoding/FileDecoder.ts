export type FileDecoder = (buffer: ArrayBuffer, progressCallback?: (bytesRead: number) => void) => string;

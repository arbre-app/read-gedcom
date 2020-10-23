import { Tag } from '../tag';
import { Node } from './Node';
import { MediaType } from './MediaType';

export class MultimediaFormat extends Node {
    static AAC = 'AAC';
    static AVI = 'AVI';
    static BMP = 'BMP';
    static E_PUB = 'ePUB';
    static FLAC = 'FLAC';
    static GIF = 'GIF';
    static JPEG = 'JPEG';
    static JPG = 'JPG';
    static MKV = 'MKV';
    static MOBI = 'mobi';
    static MP3 = 'MP3';
    static PCX = 'PCX';
    static PDF = 'PDF';
    static PNG = 'PNG';
    static TIFF = 'TIFF';
    static TIF = 'TIF';
    static WAV = 'WAV';

    constructor(data, clazz) {
        super(data, clazz || MultimediaFormat);
    }

    getMediaType() {
        return this.get(Tag.TYPE, MediaType);
    }
}

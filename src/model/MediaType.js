import { Node } from './Node';

export class MediaType extends Node {
    static AUDIO = 'audio';
    static BOOK = 'book';
    static CARD = 'card';
    static ELECTRONIC = 'electronic';
    static FICHE = 'fiche';
    static FILM = 'film';
    static MAGAZINE = 'magazine';
    static MANUSCRIPT = 'manuscript';
    static MAP = 'map';
    static NEWSPAPER = 'newspaper';
    static PHOTO = 'photo';
    static TOMBSTONE = 'tombstone';
    static VIDEO = 'video';

    constructor(data, clazz) {
        super(data, clazz || MediaType);
    }
}

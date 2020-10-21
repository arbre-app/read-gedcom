import { Node } from './Node';
import { Tag } from '../tag';

export class NoteReferenceMixin extends Node {
    constructor(data) {
        super(data, NoteReferenceMixin);
    }

}

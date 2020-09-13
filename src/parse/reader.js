import { tokenize } from './tokenizer';
import { makeTree } from './structurer';
import { createLinks } from './adapter';

export function readGedcom(input) {
    const it = tokenize(input);

    const array = [];
    for(let line of it) {
        array.push(line);
    }

    const res = makeTree(array);
    return createLinks(res);
}

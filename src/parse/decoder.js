import { Tag } from './Tag';
import { tokenize } from './tokenizer';
import { makeTree } from './structurer';
import { Node, Header } from '../model';

export function detectEncoding(input) {
    const it = tokenize(input);
    let i = 0;
    const maxIterations = 100;
    const array = [];
    for(let line of it) {
        if(i >= maxIterations) {
            break;
        }
        array.push(line);
        i += 1;
    }
    const tree = makeTree(array);
    const gedcom = new Node(tree); // Bypass checks
    const header = gedcom.getByTag(Tag.HEADER, Header);
    const charOpt = header.getByTags([Tag.CHARACTER_ENCODING, Tag.CHARACTER_ENCODING_ALT]).option().value();
    const sourceOpt = header.getSource().option().value();
    const versionOpt = header.getVersion().option().value();

    // TODO
}

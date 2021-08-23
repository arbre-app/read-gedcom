// TODO lightweight traversal methods

import { GedcomTree } from './GedcomTree';

export const nodeToString = (node: GedcomTree.Node) => {
    const lines: string[] = [];
    const initialIndent = '';
    const indent = '  ';
    const lineSeparator = '\n';
    const traverse = (node: GedcomTree.Node, totalIndent: string) => {
        const fields = [node.tag, node.pointer, node.value ? node.value.replaceAll('\n', '\\n').replaceAll('\r', '\\r') : node.value];
        const line = totalIndent + fields.filter(s => s).join(' ');
        lines.push(line);
        node.children.map(child => traverse(child, node.indexSource !== -1 ? totalIndent + indent : initialIndent))
    };
    traverse(node, initialIndent);
    return lines.join(lineSeparator);
};

// TODO lightweight traversal methods

import { TreeNode } from './TreeNode';

/**
 * Create a Gedcom-like string representation of this Gedcom node.
 * @param node The Gedcom node
 */
export const nodeToString = (node: TreeNode) => {
    const lines: string[] = [];
    const initialIndent = '';
    const indent = '  ';
    const lineSeparator = '\n';
    const traverse = (node: TreeNode, totalIndent: string) => {
        const fields = [node.tag, node.pointer, node.value ? node.value.replace(/\n/g, '\\n').replace(/\r/g, '\\r') : node.value];
        const line = totalIndent + fields.filter(s => s).join(' ');
        lines.push(line);
        node.children.map(child => traverse(child, node.indexSource !== -1 ? totalIndent + indent : initialIndent));
    };
    traverse(node, initialIndent);
    return lines.join(lineSeparator);
};

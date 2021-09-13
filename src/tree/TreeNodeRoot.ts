import { TreeNode } from './TreeNode';
import { TreeRootIndex } from './TreeRootIndex';

/**
 * The root node of a Gedcom file.
 */
export interface TreeNodeRoot extends TreeNode {
    tag: null;
    pointer: null;
    value: null;
    indexSource: -1;
    indexRelative: 0;

    _index?: TreeRootIndex;
}

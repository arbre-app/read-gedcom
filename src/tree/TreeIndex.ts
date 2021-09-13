import { TreeNode } from './TreeNode';

/**
 * The index for a node.
 */
export interface TreeIndex {
    byTag: { [tag: string]: TreeNode[] };
}

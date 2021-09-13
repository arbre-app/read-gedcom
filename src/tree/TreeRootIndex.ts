import { TreeIndex } from './TreeIndex';
import { TreeNode } from './TreeNode';

/**
 * The index for the root node.
 */
export interface TreeRootIndex extends TreeIndex {
    byTagPointer: { [tag: string]: { [pointer: string]: TreeNode } };

    asSpouse?: { [spouseId: string]: TreeNode[] };
    asChild?: { [childId: string]: TreeNode[] };
}

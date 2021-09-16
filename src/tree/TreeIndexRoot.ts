import { TreeIndex } from './TreeIndex';

/**
 * The index for the root node.
 */
export interface TreeIndexRoot extends TreeIndex {
    byTagPointer: { [tag: string]: { [pointer: string]: number } };

    asSpouse?: { [spouseId: string]: number[] };
    asChild?: { [childId: string]: number[] };
}

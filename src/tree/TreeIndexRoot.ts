import { TreeIndex } from './TreeIndex';

/**
 * The index for the root node.
 */
export interface TreeIndexRoot extends TreeIndex {
    /**
     * Find all children indices that have a pointer, by their tag.
     */
    byTagPointer: { [tag: string]: { [pointer: string]: number } };

    /**
     * Find all children indices of family records for a given individual pointer where the record is a spouse in that family.
     */
    asSpouse?: { [spouseId: string]: number[] };
    /**
     * Find all children indices of family records for a given individual pointer where the record is a child in that family.
     */
    asChild?: { [childId: string]: number[] };
}

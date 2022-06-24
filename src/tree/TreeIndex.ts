/**
 * The index for a node.
 */
export interface TreeIndex {
    /**
     * Find all children indices for a given tag.
     * This also includes children having a pointer.
     */
    byTag: { [tag: string]: number[] };
}

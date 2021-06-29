/**
 * Options to control the parsing of the Gedcom tree.
 */
export interface GedcomTreeReadingOptions {
    /**
     * When set to <code>true</code> completely disabled the indexing in the tree.
     * This option can be safely set without affecting the correctness of the other components that may use the tree.
     * However, it will incur a slowdown when querying the tree.
     */
    noIndex?: boolean;

    /**
     * When set to <code>true</code> the backwards references of the root node will not be stored (namely spouse and sibling relationships).
     * This option only has an effect when {@link noIndex} is not set, and as for that option it will not affect correctness of other components.
     * It will incur a slowdown when querying backward references.
     */
    noBackwardsReferencesIndex?: boolean;

    /**
     * When set to <code>true</code> the {@link GedcomTag.Concatenation} and {@link GedcomTag.Continuation} special tags will not get interpreted and will be preserved in the resulting tree.
     * This option might affect the behavior of other components.
     * Otherwise the tags will get inlined according to their respective semantics, and thus will never appear in the output.
     */
    noInlineContinuations?: boolean;

    /**
     * When set to <code>true</code> all the {@link GedcomTree.Node} in the tree will be frozen and modifications will be forbidden by the runtime.
     * Otherwise the objects will remain normal.
     * This option is not enabled by default for performance reasons.
     */
    doFreeze?: boolean;
}

import { type FileEncodingType } from './decoder';
import { GedcomReadingPhase } from './GedcomReadingPhase';

/**
 * Options to control the parsing of the Gedcom tree.
 */
export interface GedcomReadingOptions {
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
     * When set to <code>true</code> the {@link Tag.Concatenation} and {@link Tag.Continuation} special tags will not get interpreted and will be preserved in the resulting tree.
     * This option might affect the behavior of other components.
     * Otherwise the tags will get inlined according to their respective semantics, and thus will never appear in the output.
     */
    noInlineContinuations?: boolean;

    /**
     * When set to <code>true</code> all the {@link TreeNode} in the tree will be frozen and modifications will be forbidden by the runtime.
     * Otherwise the objects will remain normal.
     * This option is not enabled by default for performance reasons.
     */
    doFreeze?: boolean;

    /**
     * An optional callback used to track the progress.
     * Can also be used to implement preemptive multitasking (unblock the rendering thread).
     * @param phase The current phase
     * @param progress The progress of the phase, indicated by a number between <code>0</code> and <code>1</code>, or <code>null</code> if the progress cannot be determined
     */
    progressCallback?: (phase: GedcomReadingPhase, progress: number | null) => void;

    /**
     * When set, disables the automatic charset detection mechanism and forces the parser to decode the file using the specified charset.
     * This is an escape hatch and its usage is not recommended; if you encounter issues with the detection mechanism please open a ticket instead.
     */
    forcedCharset?: FileEncodingType;

    /**
     * When set to <code>true</code>, illegally encoded data will raise an exception.
     * This can occur when dealing with ANSEL encoded data.
     * The default behavior is the insertion of a unicode replacement character.
     */
    doStrictDecoding?: boolean;

    /**
     * When set to <code>true</code>, the {@link TreeNode._index} attribute will be non-enumerable.
     * As a consequence, {@link JSON.stringify} will not serialize the index.
     * It is however still possible to recompute the index, by calling {@link indexTree}.
     */
    doHideIndex?: boolean;
}

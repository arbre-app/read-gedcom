/* eslint-disable no-use-before-define */
export namespace GedcomTree {

    /**
     * A node in a Gedcom file.
     */
    export interface Node {
        /**
         * The Gedcom tag of this node. Usually in uppercase, possibly starting with an underscore.
         * The root is the only node for which the tag is <code>null</code>.
         */
        tag: string | null;

        /**
         * An optional pointer, used to reference this node elsewhere. Starts and ends with the <code>@</code> symbol and contains an uppercase identifier.
         */
        pointer: string | null;

        /**
         * An optional string value. Can be any string.
         */
        value: string | null;

        /**
         * Absolute node index in source file, namely the line number minus one.
         * The <code>CONT</code> and <code>CONC</code> pseudo-tags are included in the count, hence possibly introducing gaps in the indices.
         */
        indexSource: number;

        /**
         * Node index in the output tree, relative to the parent.
         */
        indexRelative: number;

        /**
         * This node's children nodes.
         */
        children: Node[];

        _index?: Index;
    }

    export interface Index {
        byTag: { [tag: string]: Node[] };
    }

    // Refinements

    export interface NodeRoot extends Node {
        tag: null;
        pointer: null;
        value: null;
        indexSource: -1;
        indexRelative: 0;

        _index?: RootIndex;
    }

    export interface RootIndex extends Index {
        byTagPointer: { [tag: string]: { [pointer: string]: Node } };

        asSpouse?: { [spouseId: string]: Node[] };
        asChild?: { [childId: string]: Node[] };
    }

}

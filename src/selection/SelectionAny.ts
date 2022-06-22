import { AnyConstructor, enumerable } from '../meta';
import { TreeIndex, TreeNode, TreeNodeRoot, TreeIndexRoot, nodeToString } from '../tree';
import { SelectionGedcom } from './internal';

/**
 * A selection of Gedcom nodes, represented in an array-like datastructure.
 */
export class SelectionAny implements ArrayLike<TreeNode> {
    /**
     * The number of nodes in the selection.
     * @category Base
     */
    length: number;

    /**
     * The nodes in the selection.
     * @category Base
     */
    [n: number]: TreeNode; // eslint-disable-line no-undef

    /**
     * The common root node of the elements in this selection.
     * @category Base
     */
    @enumerable(false)
    rootNode: TreeNodeRoot;

    /**
     * @param rootNode
     * @param nodes
     * @category Base
     */
    constructor(rootNode: TreeNodeRoot, nodes: TreeNode[]) {
        this.rootNode = rootNode;
        this.length = nodes.length;
        for (let i = 0; i < nodes.length; i++) {
            this[i] = nodes[i];
        }
    }

    /**
     * Returns a constructor for this selection.
     * @private
     * @category Base
     */
    #selfConstructor(): AnyConstructor<this> {
        if (Object.getPrototypeOf !== undefined) {
            return Object.getPrototypeOf(this).constructor as AnyConstructor<this>;
        } else {
            return (this as any).__proto__.constructor; // eslint-disable-line no-proto
        }
    }

    /**
     * Returns an array of {@link TreeNode.tag}.
     * @category Base
     */
    tag(): (string | null)[] {
        const array = [];
        for (let i = 0; i < this.length; i++) {
            array.push(this[i].tag);
        }
        return array;
    }

    /**
     * Returns an array of {@link TreeNode.pointer}.
     * @category Base
     */
    pointer(): (string | null)[] {
        const array = [];
        for (let i = 0; i < this.length; i++) {
            array.push(this[i].pointer);
        }
        return array;
    }

    /**
     * Returns an array of {@link TreeNode.value}.
     * @category Base
     */
    value(): (string | null)[] {
        const array = [];
        for (let i = 0; i < this.length; i++) {
            array.push(this[i].value);
        }
        return array;
    }

    /**
     * Calls {@link value} and filters out <code>null</code> values.
     * @category Base
     */
    valueNonNull(): string[] {
        return this.value().filter((v): v is string => v !== null);
    }

    /**
     * Wraps the value of {@link rootNode} in {@link SelectionGedcom}.
     * The selection will contain exactly one node.
     * @category Base
     */
    root(): SelectionGedcom {
        return new SelectionGedcom(this.rootNode, [this.rootNode]);
    }

    /**
     * Query the direct children of this node.
     * It is possible to efficiently filter the results by tag and pointer.
     * Leaving either or both of these parameter empty will result in a wildcard behavior (not filtering).
     * In most cases this method is not useful as the functionality is already implemented in the subclasses through various more precise methods.
     * Returns an array of children.
     * @param tag Optionally filter the results by their Gedcom tag
     * @param pointer Optionally filter the result by their pointer value
     * @category Base
     */
    get(tag?: string | string[] | null, pointer?: string | string[] | null): SelectionAny;

    /**
     * Query the direct children of this node.
     * It is possible to efficiently filter the results by tag and pointer.
     * Leaving either or both of these parameter empty will result in a wildcard behavior (not filtering).
     * In most cases this method is not useful as the functionality is already implemented in the subclasses through various more precise methods.
     * Returns an array of children.
     * Additionally, allows the specification of an adapter class.
     * @param tag Optionally filter the results by their Gedcom tag
     * @param pointer Optionally filter the result by their pointer value
     * @param adapter The adapter class, see {@link as}
     * @category Base
     */
    get<N extends SelectionAny>(tag: string | string[] | null, pointer: string | string[] | null, adapter: AnyConstructor<N>): N;

    // Implementation
    get<N extends SelectionAny>(tag?: string | string[] | null, pointer?: string | string[] | null, adapter?: AnyConstructor<N>): N {
        const Adapter = adapter != null ? adapter : SelectionAny as unknown as AnyConstructor<N>; // Type safety of this cast is enforced by the signature of the visible methods
        const tags = tag != null ? (Array.isArray(tag) ? tag : [tag]) : null;
        const pointers = pointer != null ? (Array.isArray(pointer) ? pointer : [pointer]) : null;
        const selection: TreeNode[] = [];

        for (let i = 0; i < this.length; i++) {
            const node = this[i];
            if (tags === null && pointers === null) { // No need of index
                node.children.forEach(child => selection.push(child));
            } else if (node._index !== undefined) { // Use index
                const index = node._index as TreeIndex;
                const intermediary: TreeNode[] = [];
                const requiresSorting = (tags !== null && tags.length > 0) || (pointers !== null && pointers.length > 0);
                if (pointers !== null) {
                    const rootIndex = index as TreeIndexRoot;
                    if (rootIndex.byTagPointer !== undefined) { // If the cast is unsafe then the selection should be empty
                        if (tags !== null) {
                            tags.forEach(t => pointers.forEach(p => {
                                const childIdx = rootIndex.byTagPointer[t][p];
                                if (childIdx !== undefined) {
                                    intermediary.push(node.children[childIdx]);
                                }
                            }));
                        } else {
                            Object.values(rootIndex.byTagPointer).forEach(nodes => pointers.forEach(p => {
                                const childIdx = nodes[p];
                                if (childIdx !== undefined) {
                                    intermediary.push(node.children[childIdx]);
                                }
                            }));
                        }
                    }
                } else {
                    const tagsNonNull = tags as string[]; // Safe cast
                    tagsNonNull.forEach(t => {
                        const nodesIdx = index.byTag[t];
                        if (nodesIdx !== undefined) {
                            nodesIdx.forEach(childIdx => intermediary.push(node.children[childIdx]));
                        }
                    });
                }

                if (requiresSorting) {
                    intermediary.sort((a, b) => a.indexSource - b.indexSource);
                }
                intermediary.forEach(child => selection.push(child));
            } else { // No index fallback
                node.children.filter(child =>
                    (tags === null || (child.tag !== null && tags.includes(child.tag))) &&
                    (pointers === null || (child.pointer !== null && pointers.includes(child.pointer))),
                ).forEach(child => selection.push(child));
            }
        }

        return new Adapter(this.rootNode, selection);
    }

    /**
     * Filter nodes from the selection based on a predicate.
     * @param f The filtering predicate
     * @category Base
     */
    filter(f: (node: TreeNode) => boolean): this {
        const nodes: TreeNode[] = [];
        for (let i = 0; i < this.length; i++) {
            const node = this[i];
            if (f(node)) {
                nodes.push(node);
            }
        }
        const Constructor = this.#selfConstructor();
        return new Constructor(this.rootNode, nodes);
    }

    /**
     * Filter lifted nodes from the selection based on a predicate.
     * The argument is a selection of one node.
     * @param f The filtering predicate
     * @category Base
     */
    filterSelect(f: (node: this) => boolean): this {
        const Constructor = this.#selfConstructor();
        const nodes: TreeNode[] = [];
        for (let i = 0; i < this.length; i++) {
            const node = this[i];
            if (f(new Constructor(this.rootNode, [node]))) {
                nodes.push(node);
            }
        }
        return new Constructor(this.rootNode, nodes);
    }

    /**
     * View this selection as a different type. This method can be used to extend functionality for non-standard Gedcom files.
     * @param Adapter The class adapter
     * @category Base
     */
    as<N extends SelectionAny>(Adapter: AnyConstructor<N>): N {
        return new Adapter(this.rootNode, this);
    }

    /**
     * Export the selection as an array of nodes.
     * The inverse operation is {@link of}.
     * @category Base
     */
    array(): TreeNode[] {
        const array = [];
        for (let i = 0; i < this.length; i++) {
            array.push(this[i]);
        }
        return array;
    }

    /**
     * Exports the selection as an array of selections of one element.
     * @category Base
     */
    arraySelect(): this[] {
        const Constructor = this.#selfConstructor();
        const array = [];
        for (let i = 0; i < this.length; i++) {
            array.push(new Constructor(this.rootNode, [this[i]]));
        }
        return array;
    }

    /**
     * Returns a concatenation of two selections.
     * The right hand side selection should be a subtype of the left hand side's.
     * The resulting selection will be the same type as the left hand side's.
     * @param other The right hand side selection
     * @category Base
     */
    concatenate<N extends this>(other: N): this {
        const Constructor = this.#selfConstructor();
        const nodes: TreeNode[] = [];
        for (let i = 0; i < this.length; i++) {
            nodes.push(this[i]);
        }
        for (let i = 0; i < other.length; i++) {
            nodes.push(other[i]);
        }
        return new Constructor(this.rootNode, nodes);
    }

    /**
     * Returns a concatenation of two selections.
     * The right hand side selection should be a subtype of the left hand side's.
     * The resulting selection will be the same type as the left hand side's, with the elements of the right hand side's first.
     * @param other The right hand side selection
     * @category Base
     */
    concatenateLeft<N extends this>(other: N): this {
        const Constructor = this.#selfConstructor();
        const nodes: TreeNode[] = [];
        for (let i = 0; i < other.length; i++) {
            nodes.push(other[i]);
        }
        for (let i = 0; i < this.length; i++) {
            nodes.push(this[i]);
        }
        return new Constructor(this.rootNode, nodes);
    }

    /**
     * Returns a sorted selection, with respect to the comparator.
     * The default comparator relies on the {@link TreeNode.indexSource} attribute.
     * @param comparator The comparator
     * @category Base
     */
    sorted(comparator: (a: TreeNode, b: TreeNode) => number = (a, b) => a.indexSource - b.indexSource): this {
        const Constructor = this.#selfConstructor();
        const nodes: TreeNode[] = [];
        for (let i = 0; i < this.length; i++) {
            nodes.push(this[i]);
        }
        nodes.sort(comparator);
        return new Constructor(this.rootNode, nodes);
    }

    /**
     * Checks whether two selections are equal.
     * Note that the strategy used here is reference equality, hence for this method to return <code>true</code>, the nodes must be the same references (and in the same order).
     * @param other The selection to compare it against
     * @category Base
     */
    equals(other: SelectionAny): boolean {
        if (this.length !== other.length) {
            return false;
        }
        for (let i = 0; i < this.length; i++) {
            if (this[i] !== other[i]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Returns a string representation for this selection.
     * @category Base
     */
    toString(): string {
        return this.length > 0 ? this.array().map(nodeToString).join('\n\n') : '(empty selection)';
    }

    /**
     * Create a selection from an array of nodes.
     * It is highly recommended (but not required) for the nodes to be at the same logical level in the hierarchy.
     * The inverse operation is {@link array}.
     * @param previous The previous selection, required to inherit the reference to the root
     * @param nodes The nodes to be included in the selection
     * @category Base
     */
    static of(previous: SelectionAny, nodes: TreeNode[] | TreeNode): SelectionAny;

    /**
     * Create a selection from an array of nodes.
     * It is highly recommended (but not required) for the nodes to be at the same logical level in the hierarchy.
     * The inverse operation is {@link array}.
     * @param previous The previous selection, required to inherit the reference to the root
     * @param nodes The nodes to be included in the selection
     * @param Adapter The adapter class, see {@link as}
     * @category Base
     */
    static of<N extends SelectionAny>(previous: SelectionAny, nodes: TreeNode[] | TreeNode, Adapter: AnyConstructor<N>): N;

    // Implementation
    static of<N extends SelectionAny>(previous: SelectionAny, nodes: TreeNode[] | TreeNode, Adapter?: AnyConstructor<N>): N {
        const AdapterClass = Adapter != null ? Adapter : SelectionAny as unknown as AnyConstructor<N>;
        const nodesArray = Array.isArray(nodes) ? nodes : [nodes];
        return new AdapterClass(previous.rootNode, nodesArray);
    }
}

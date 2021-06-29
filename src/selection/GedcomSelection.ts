import {GedcomTree} from '../tree';
import {AnyConstructor, enumerable} from "../meta";

/**
 * A selection of Gedcom nodes, represented in an array-like datastructure.
 */
export class GedcomSelection implements ArrayLike<GedcomTree.Node> {

    /**
     * The number of nodes in the selection.
     */
    length: number;

    /**
     * The nodes in the selection.
     */
    [n: number]: GedcomTree.Node;

    /**
     * The common root node of the elements in this selection.
     */
    @enumerable(false)
    rootNode: GedcomTree.NodeRoot;

    constructor(rootNode: GedcomTree.NodeRoot, nodes: GedcomTree.Node[]) {
        this.rootNode = rootNode;
        this.length = nodes.length;
        nodes.forEach((node, i) => this[i] = node);
    }

    /**
     * Returns an array of {@link Node.tag}.
     */
    tag(): (string | null)[] {
        const array = [];
        for(let i = 0; i < this.length; i++) {
            array.push(this[i].tag);
        }
        return array;
    }

    /**
     * Returns an array of {@link Node.pointer}.
     */
    pointer(): (string | null)[] {
        const array = [];
        for(let i = 0; i < this.length; i++) {
            array.push(this[i].pointer);
        }
        return array;
    }

    /**
     * Returns an array of {@link Node.value}.
     */
    value(): (string | null)[] {
        const array = [];
        for(let i = 0; i < this.length; i++) {
            array.push(this[i].value);
        }
        return array;
    }

    /**
     * Calls {@link value} and filters out <code>null</code> values.
     */
    valueNonNull(): string[] {
        return this.value().filter(v => v !== null) as string[]; // Provably safe
    }

    /**
     * Wraps the value of {@link rootNode} in {@link GedcomSelection.Gedcom}.
     * The selection will contain exactly one node.
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
     */
    get(tag?: string | string[] | null, pointer?: string | string[] | null): GedcomSelection;

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
     */
    get<N extends GedcomSelection>(tag: string | string[] | null, pointer: string | string[] | null, adapter: AnyConstructor<N>): N;

    // Implementation
    get<N extends GedcomSelection>(tag?: string | string[] | null, pointer?: string | string[] | null, adapter?: AnyConstructor<N>): N {
        const Adapter = adapter != null ? adapter :
            GedcomSelection as unknown as AnyConstructor<N>; // Type safety of this cast is enforced by the signature of the visible methods
        const tags = tag != null ? (Array.isArray(tag) ? tag : [tag]) : null;
        const pointers = pointer != null ? (Array.isArray(pointer) ? pointer : [pointer]) : null;
        const selection: GedcomTree.Node[] = [];

        for (let i = 0; i < this.length; i++) {
            const node = this[i];
            if (tags === null && pointers === null) { // No need of index
                node.children.forEach(child => selection.push(child));
            } else if (node._index !== undefined) { // Use index
                const index = node._index as GedcomTree.Index;
                const intermediary: GedcomTree.Node[] = [];
                const requiresSorting = (tags !== null && tags.length > 0) || (pointers !== null && pointers.length > 0);
                if (pointers !== null) {
                    const rootIndex = index as GedcomTree.RootIndex;
                    if (rootIndex.byTagPointer !== undefined) { // If the cast is unsafe then the selection should be empty
                        if (tags !== null) {
                            tags.forEach(t => pointers.forEach(p => {
                                const child = rootIndex.byTagPointer[t][p];
                                if (child !== undefined) {
                                    intermediary.push(child);
                                }
                            }))
                        } else {
                            Object.values(rootIndex.byTagPointer).forEach(nodes => pointers.forEach(p => {
                                const child = nodes[p];
                                if (child !== undefined) {
                                    intermediary.push(child);
                                }
                            }));
                        }
                    }
                } else {
                    const tagsNonNull = tags as string[]; // Safe cast
                    tagsNonNull.forEach(t => {
                        const nodes = index.byTag[t];
                        if (nodes !== undefined) {
                            nodes.forEach(child => intermediary.push(child))
                        }
                    })
                }

                if (requiresSorting) {
                    intermediary.sort((a, b) => a.indexSource - b.indexSource);
                }
                intermediary.forEach(child => selection.push(child));
            } else { // No index fallback
                node.children.filter(child =>
                    (tags === null || (child.tag !== null && tags.includes(child.tag)))
                    && (pointers === null || (child.pointer !== null && pointers.includes(child.pointer)))
                ).forEach(child => selection.push(child));
            }
        }

        return new Adapter(this.rootNode, selection);
    }

    /**
     * View this selection as a different type. This method can be used to extend functionality for non-standard Gedcom files.
     * @param adapter The class adapter
     */
    as<N extends GedcomSelection>(adapter: AnyConstructor<N>): N {
        throw new Error('Not implemented');
    }

    /**
     * Export the selection as an array of nodes.
     * The inverse operation is {@link of}.
     */
    array(): GedcomTree.Node[] {
        throw new Error('Not implemented');
    }

    /**
     * Create a selection from an array of nodes.
     * It is highly recommended (but not required) for the nodes to be at the same logical level in the hierarchy.
     * The inverse operation is {@link array}.
     * @param previous The previous selection, required to inherit the reference to the root
     * @param nodes The nodes to be included in the selection
     * @param adapter The adapter class, see {@link as}
     */
    static of<N extends GedcomSelection>(previous: GedcomSelection, nodes: GedcomTree.Node[] | GedcomTree.Node, adapter: AnyConstructor<N>): N {
        throw new Error('Not implemented');
    }
}

import { SelectionHeader } from './SelectionHeader';
import { GedcomTag } from '../tag';
import {SelectionSubmitterRecord} from "./SelectionSubmitterRecord";
import {SelectionIndividualRecord} from "./SelectionIndividualRecord";
import {SelectionFamilyRecord} from "./SelectionFamilyRecord";
import {SelectionMultimediaRecord} from "./SelectionMultimediaRecord";
import {SelectionNoteRecord} from "./SelectionNoteRecord";
import {SelectionSourceRecord} from "./SelectionSourceRecord";
import {SelectionRecord} from "./SelectionRecord";
import {SelectionRepositoryRecord} from "./SelectionRepositoryRecord";

/**
 * The root of a Gedcom file.
 * Remark that the actual root is a pseudo node, and hence will store <code>null</code> for the attributes {@link tag}, {@link pointer} and {@link value}.
 */
export class SelectionGedcom extends GedcomSelection {
    getHeader() {
        return this.get(GedcomTag.Header, null, SelectionHeader);
    }

    getRecord<R extends SelectionRecord>(tag: string | string[] | null, pointer: string | string[] | null, SelectionAdapter: AnyConstructor<R>): R {
        return this.get(tag, pointer, SelectionAdapter);
    }

    getSubmitterRecord(pointer?: string | string[] | null) {
        return this.getRecord(GedcomTag.Submitter, pointer ?? null, SelectionSubmitterRecord);
    }

    getIndividualRecord(pointer?: string | string[] | null) {
        return this.getRecord(GedcomTag.Individual, pointer ?? null, SelectionIndividualRecord);
    }

    getFamilyRecord(pointer?: string | string[] | null) {
        return this.getRecord(GedcomTag.Family, pointer ?? null, SelectionFamilyRecord);
    }

    getMultimediaRecord(pointer?: string | string[] | null) {
        return this.getRecord(GedcomTag.Object, pointer ?? null, SelectionMultimediaRecord);
    }

    getNoteRecord(pointer?: string | string[] | null) {
        return this.getRecord(GedcomTag.Note, pointer ?? null, SelectionNoteRecord);
    }

    getSourceRecord(pointer?: string | string[] | null) {
        return this.getRecord(GedcomTag.Source, pointer ?? null, SelectionSourceRecord);
    }

    getRepositoryRecord(pointer?: string | string[] | null) {
        return this.getRecord(GedcomTag.Repository, pointer ?? null, SelectionRepositoryRecord);
    }

    // TODO
}

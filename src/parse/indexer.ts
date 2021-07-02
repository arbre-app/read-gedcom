import { GedcomTag } from '../tag';
import { GedcomTree } from '../tree';
import { GedcomError } from './error';

const PROGRESS_TRAVERSE_INTERVAL = 50000;
const PROGRESS_ITERATE_INTERVAL = 5000;

/**
 * Computes an index for each node in the tree.
 * This operation is idempotent: applying several times will not have further effects (but will cost resources as the whole tree will be traversed anyway).
 * @param rootNode The root node
 * @param noBackwardsReferencesIndex See {@link GedcomReadingOptions.noBackwardsReferencesIndex}
 * @param progressCallback See {@link GedcomReadingOptions.progressCallback}
 */
export const indexTree = (rootNode: GedcomTree.NodeRoot,
                          noBackwardsReferencesIndex = false,
                          progressCallback: (() => void) | null = null): void => {
    if (progressCallback) {
        progressCallback();
    }

    let i = 0;
    const stack: [node: GedcomTree.Node, childIndex: number][] = [[rootNode, 0]];
    while (stack.length > 0) {
        const [node, childIndex] = stack[stack.length - 1]; // Peek
        if (childIndex < node.children.length) {
            stack.push([node.children[childIndex], 0]); // Push
        } else {
            // eslint-disable-next-line
            const [node, _] = stack.pop() as [GedcomTree.Node, number]; // Pop
            if (stack.length > 0) {
                stack[stack.length - 1][1]++; // Next child
            }
            indexNode(node); // Index
            if (stack.length === 0) {
                indexRecords(node as GedcomTree.NodeRoot); // Index records on root node
            }
        }

        i++;
        if (progressCallback && i % PROGRESS_TRAVERSE_INTERVAL === 0) {
            progressCallback();
        }
    }

    if (!noBackwardsReferencesIndex) {
        indexBackwardsReferences(rootNode, progressCallback);
    }

    if (progressCallback) {
        progressCallback();
    }
};

const indexNode = (node: GedcomTree.Node): void => {
    const byTag: { [tag: string]: GedcomTree.Node[] } = {};
    node.children.forEach(child => {
        if (child.tag !== null) {
            if (byTag[child.tag] === undefined) {
                byTag[child.tag] = [];
            }
            byTag[child.tag].push(child);
        }
    });
    node._index = { byTag } as GedcomTree.Index;
};

const indexRecords = (nodeRoot: GedcomTree.NodeRoot): void => {
    const byTagPointer: { [tag: string]: { [pointer: string]: GedcomTree.Node } } = {};
    nodeRoot.children.forEach(child => {
        if (child.tag !== null) {
            if (child.pointer !== null) {
                if (byTagPointer[child.tag] === undefined) {
                    byTagPointer[child.tag] = {};
                }
                if (byTagPointer[child.tag][child.pointer] !== undefined) {
                    throw new GedcomError.DuplicatePointerError(`Duplicate key: ${child.pointer}`);
                }
                byTagPointer[child.tag][child.pointer] = child;
            }
        }
    });
    // We assume that the index is defined
    (nodeRoot._index as GedcomTree.RootIndex).byTagPointer = byTagPointer;
};

// eslint-disable-next-line
const indexBackwardsReferences = (rootNode: GedcomTree.NodeRoot, progressCallback: (() => void) | null = null): void => {
    const get = <V, D>(object: { [k: string]: V }, key: string, def: D): V | D => {
        const value = object[key];
        return value != null ? value : def;
    };

    const index = rootNode._index as GedcomTree.RootIndex; // We assume that the index is defined

    const families = get(index.byTagPointer, GedcomTag.Family, {} as { [p: string]: GedcomTree.Node });
    const asSpouse: { [spouseId: string]: GedcomTree.Node[] } = {}, asChild: { [childId: string]: GedcomTree.Node[] } = {};
    Object.values(families).forEach((familyData, i) => {
        const familyIndex = familyData._index as GedcomTree.Index; // Also safe, by assumption
        for (const spouseType of [GedcomTag.Husband, GedcomTag.Wife]) {
            for (const spouse of get(familyIndex.byTag, spouseType, [])) {
                const spouseId = spouse.value;
                if (spouseId !== null) { // We ignore the other possibility (even though it is a hard violation)
                    if (asSpouse[spouseId] !== undefined) {
                        asSpouse[spouseId].push(familyData);
                    } else {
                        asSpouse[spouseId] = [familyData];
                    }
                }
            }
        }
        for (const child of get(familyIndex.byTag, GedcomTag.Child, [])) {
            const childId = child.value;
            if (childId !== null) { // ditto
                if (asChild[childId] !== undefined) {
                    asChild[childId].push(familyData);
                } else {
                    asChild[childId] = [familyData];
                }
            }
        }

        if (progressCallback && i % PROGRESS_ITERATE_INTERVAL === 0) {
            progressCallback();
        }
    });

    index.asSpouse = asSpouse;
    index.asChild = asChild;
};

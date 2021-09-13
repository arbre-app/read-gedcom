import { Tag } from '../tag';
import { TreeIndex, TreeNode, TreeNodeRoot, TreeRootIndex } from '../tree';
import { ErrorDuplicatePointer } from './error';

const PROGRESS_TRAVERSE_INTERVAL = 50000;
const PROGRESS_ITERATE_INTERVAL = 5000;

/**
 * Computes an index for each node in the tree.
 * This operation is idempotent: applying several times will not have further effects (but will cost resources as the whole tree will be traversed anyway).
 * @param rootNode The root node
 * @param noBackwardsReferencesIndex See {@link GedcomReadingOptions.noBackwardsReferencesIndex}
 * @param progressCallback See {@link GedcomReadingOptions.progressCallback}
 * @param doHideIndex See {@link GedcomReadingOptions.doHideIndex}
 */
export const indexTree = (rootNode: TreeNodeRoot,
                          noBackwardsReferencesIndex = false,
                          progressCallback: (() => void) | null = null,
                          doHideIndex = false): void => {
    if (progressCallback) {
        progressCallback();
    }

    let i = 0;
    const stack: [node: TreeNode, childIndex: number][] = [[rootNode, 0]];
    while (stack.length > 0) {
        const [node, childIndex] = stack[stack.length - 1]; // Peek
        if (childIndex < node.children.length) {
            stack.push([node.children[childIndex], 0]); // Push
        } else {
            // eslint-disable-next-line
            const [node, _] = stack.pop() as [TreeNode, number]; // Pop
            if (stack.length > 0) {
                stack[stack.length - 1][1]++; // Next child
            }
            indexNode(node, !doHideIndex); // Index
            if (stack.length === 0) {
                indexRecords(node as TreeNodeRoot); // Index records on root node
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

const indexNode = (node: TreeNode, enumerable: boolean): void => {
    const byTag: { [tag: string]: TreeNode[] } = {};
    node.children.forEach(child => {
        if (child.tag !== null) {
            if (byTag[child.tag] === undefined) {
                byTag[child.tag] = [];
            }
            byTag[child.tag].push(child);
        }
    });
    Object.defineProperty(node, '_index', {
        enumerable,
        configurable: true,
        writable: true,
    });
    node._index = { byTag } as TreeIndex;
};

const indexRecords = (nodeRoot: TreeNodeRoot): void => {
    const byTagPointer: { [tag: string]: { [pointer: string]: TreeNode } } = {};
    nodeRoot.children.forEach(child => {
        if (child.tag !== null) {
            if (child.pointer !== null) {
                if (byTagPointer[child.tag] === undefined) {
                    byTagPointer[child.tag] = {};
                }
                if (byTagPointer[child.tag][child.pointer] !== undefined) {
                    throw new ErrorDuplicatePointer(
                        `Duplicate pointer: ${child.pointer}`,
                        child.indexSource + 1,
                        byTagPointer[child.tag][child.pointer].indexSource,
                        child.pointer);
                }
                byTagPointer[child.tag][child.pointer] = child;
            }
        }
    });
    // We assume that the index is defined
    (nodeRoot._index as TreeRootIndex).byTagPointer = byTagPointer;
};

// eslint-disable-next-line
const indexBackwardsReferences = (rootNode: TreeNodeRoot, progressCallback: (() => void) | null = null): void => {
    const get = <V, D>(object: { [k: string]: V }, key: string, def: D): V | D => {
        const value = object[key];
        return value != null ? value : def;
    };

    const index = rootNode._index as TreeRootIndex; // We assume that the index is defined

    const families = get(index.byTagPointer, Tag.Family, {} as { [p: string]: TreeNode });
    const asSpouse: { [spouseId: string]: TreeNode[] } = {}, asChild: { [childId: string]: TreeNode[] } = {};
    Object.values(families).forEach((familyData, i) => {
        const familyIndex = familyData._index as TreeIndex; // Also safe, by assumption
        for (const spouseType of [Tag.Husband, Tag.Wife]) {
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
        for (const child of get(familyIndex.byTag, Tag.Child, [])) {
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

import { Tag } from '../tag';
import { TreeIndex, TreeNode, TreeNodeRoot, TreeIndexRoot } from '../tree';
import { ErrorDuplicatePointer } from './error';

const PROGRESS_TRAVERSE_INTERVAL = 50000;
const PROGRESS_ITERATE_INTERVAL = 5000;

/**
 * Computes an index for each node in the tree.
 * This operation is idempotent: applying several times will not have further effects (but will cost resources as the whole tree will be traversed anyway).
 * @param rootNode The root node
 * @param noBackwardsReferencesIndex See {@link GedcomReadingOptions.noBackwardsReferencesIndex}
 * @param doHideIndex See {@link GedcomReadingOptions.doHideIndex}
 * @param progressCallback See {@link GedcomReadingOptions.progressCallback}
 * @category Gedcom parser
 */
export const indexTree = (rootNode: TreeNodeRoot,
                          noBackwardsReferencesIndex = false,
                          doHideIndex = false,
                          progressCallback: (() => void) | null = null): void => {
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
    const byTag: { [tag: string]: number[] } = {};
    node.children.forEach((child, idx) => {
        if (child.tag !== null) {
            if (byTag[child.tag] === undefined) {
                byTag[child.tag] = [];
            }
            byTag[child.tag].push(idx);
        }
    });
    Object.defineProperty(node, '_index', {
        enumerable,
        configurable: true,
        writable: true,
    });
    node._index = { byTag };
};

const indexRecords = (nodeRoot: TreeNodeRoot): void => {
    const byTagPointer: { [tag: string]: { [pointer: string]: number } } = {};
    nodeRoot.children.forEach((child, idx) => {
        if (child.tag !== null) {
            if (child.pointer !== null) {
                if (byTagPointer[child.tag] === undefined) {
                    byTagPointer[child.tag] = {};
                }
                if (byTagPointer[child.tag][child.pointer] !== undefined) {
                    throw new ErrorDuplicatePointer(
                        `Duplicate pointer: ${child.pointer}`,
                        child.indexSource + 1,
                        nodeRoot.children[byTagPointer[child.tag][child.pointer]].indexSource,
                        child.pointer);
                }
                byTagPointer[child.tag][child.pointer] = idx;
            }
        }
    });
    // We assume that the index is defined
    (nodeRoot._index as TreeIndexRoot).byTagPointer = byTagPointer;
};

const indexBackwardsReferences = (rootNode: TreeNodeRoot, progressCallback: (() => void) | null = null): void => {
    const get = <V, D>(object: { [k: string]: V }, key: string, def: D): V | D => {
        const value = object[key];
        return value != null ? value : def;
    };

    const index = rootNode._index as TreeIndexRoot; // We assume that the index is defined

    const families = get(index.byTagPointer, Tag.Family, {} as { [p: string]: number });
    const asSpouse: { [spouseId: string]: number[] } = {}, asChild: { [childId: string]: number[] } = {};
    Object.values(families).forEach((familyIdx, i) => {
        const family = rootNode.children[familyIdx];
        const familyIndex = family._index as TreeIndex; // Also safe, by assumption
        for (const spouseType of [Tag.Husband, Tag.Wife]) {
            for (const spouseIdx of get(familyIndex.byTag, spouseType, [])) {
                const spouseId = family.children[spouseIdx].value;
                if (spouseId !== null) { // We ignore the other possibility (even though it is a hard violation)
                    if (asSpouse[spouseId] !== undefined) {
                        asSpouse[spouseId].push(familyIdx);
                    } else {
                        asSpouse[spouseId] = [familyIdx];
                    }
                }
            }
        }
        for (const childIdx of get(familyIndex.byTag, Tag.Child, [])) {
            const childId = family.children[childIdx].value;
            if (childId !== null) { // ditto
                if (asChild[childId] !== undefined) {
                    asChild[childId].push(familyIdx);
                } else {
                    asChild[childId] = [familyIdx];
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

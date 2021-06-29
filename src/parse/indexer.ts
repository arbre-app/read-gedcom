import { GedcomTree } from '../tree';

/**
 * Computes an index for each node in the tree.
 * This operation is idempotent: applying several times will not have further effects (but will cost resources as the whole tree will be traversed anyway).
 * @param rootNode The root node
 * @param noBackwardsReferencesIndex See {@link GedcomTreeReadingOptions.noBackwardsReferencesIndex}
 */
export const indexTree = (rootNode: GedcomTree.NodeRoot, noBackwardsReferencesIndex = false): void => {
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
    }

    if (!noBackwardsReferencesIndex) {
        indexBackwardsReferences(rootNode);
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
                    throw new Error('Duplicate key'); // TODO improve message
                }
                byTagPointer[child.tag][child.pointer] = child;
            }
        }
    });
    // We assume that the index is defined
    (nodeRoot._index as GedcomTree.RootIndex).byTagPointer = byTagPointer;
};

// eslint-disable-next-line
const indexBackwardsReferences = (rootNode: GedcomTree.NodeRoot): void => {
    // We assume that the index is defined
    // TODO
};

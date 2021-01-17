import { _get } from '../utils';
import { Value } from './Value';

export class Node {
    constructor(tree, clazz = Node) {
        // Validation
        if (!tree || !clazz) {
            if (!tree) {
                throw 'Undefined tree';
            } else {
                throw 'Undefined adapter class';
            }
        }
        if (!Array.isArray(tree)) {
            throw 'Tree should be an array';
        }
        this._data = {
            tree: tree,
            Clazz: clazz,
        };
    }

    _newInstance(Clazz, tree, parentIndices, parent) {
        const instance = new Clazz(tree);
        instance._data.root = this._data.root;
        instance._data.parent = parent;
        instance._data.parentIndices = parentIndices;
        return instance;
    }

    get(tag, q = null, Adapter = Node) {
        const tagArray = tag != null ? (Array.isArray(tag) ? tag : [tag]) : null;
        const withLimit = q != null;
        if (withLimit && !Number.isInteger(q)) {
            throw 'The quantifier provided is not an integer';
        }
        const tree = this._data.tree;
        const arrayChildren = [], arrayParents = [];
        tree.forEach((tr, i) => {
            if (tagArray !== null) { // Array of tags
                tagArray.forEach(tg => {
                    let all = _get(tr.by_tag, tg, []);
                    if (withLimit) {
                        all = all.slice(0, q);
                    }
                    all.forEach(v => {
                        arrayChildren.push(v);
                        arrayParents.push(i);
                    });
                });
            } else { // All tags
                let j = 0;
                for (const tag in tr.by_tag) {
                    if (withLimit && j >= q) {
                        break;
                    }
                    const objects = tr.by_tag[tag];
                    objects.forEach(v => {
                        arrayChildren.push(v);
                        arrayParents.push(i);
                        j++;
                    });
                }
            }
        });
        return this._newInstance(Adapter, arrayChildren, arrayParents, this);
    }

    value() {
        return new Value(this._data.tree.map(t => t.value));
    }

    pointer() {
        return new Value(this._data.tree.map(t => t.pointer));
    }

    tag() {
        return new Value(this._data.tree.map(t => t.tag));
    }

    count() {
        return this._data.tree.length;
    }

    isEmpty() {
        return !this._data.tree.length;
    }

    parent() {
        const data = this._data;
        if (!data.parent) {
            throw 'Root node has no parent';
        }
        const parent = data.parent;
        const treesSet = new Set();
        const parentTrees = [], parentIndices = [];
        data.parentIndices.forEach((v, i) => {
            const parentIndex = parent._data.parentIndices[v];
            const parentTree = parent._data.tree[parentIndex];
            if (!treesSet.has(parentTree)) { // New unique parent
                treesSet.add(parentTree);
                parentTrees.push(parentTree);
                parentIndices.push(parentIndex);
            }
        });
        return this._newInstance(parent._data.Clazz, parentTrees, parentIndices, parent._data.parent);
    }

    getGedcom() {
        return this._data.root;
    }

    array() {
        const data = this._data;
        return data.tree.map((t, i) => this._newInstance(data.Clazz, [t], [data.parentIndices[i]], data.parent));
    }

    children(Adapter = Node) {
        const arrayChildren = [], arrayParents = [];
        this._data.tree.forEach((tr, i) => {
            tr.children.forEach(c => {
                arrayChildren.push(c);
                arrayParents.push(i);
            });
        });
        return this._newInstance(Adapter, arrayChildren, arrayParents, this);
    }

    filter(f) {
        const data = this._data;
        const newTree = [], newIndices = [];
        data.tree.filter((t, i) => {
            const parentIndex = data.parentIndices[i];
            const unitNode = this._newInstance(data.Clazz, [t], [parentIndex], data.parent);
            if(f(unitNode)) {
                newTree.push(t);
                newIndices.push(parentIndex);
            }
        });
        return this._newInstance(data.Clazz, newTree, newIndices, data.parent);
    }

    as(Adapter) {
        const data = this._data;
        return this._newInstance(Adapter, data.tree, data.parentIndices, data.parent);
    }

    // TODO
}

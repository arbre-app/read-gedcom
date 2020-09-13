import { _get } from '../utils';

export class Node {
    constructor(tree, Clazz = Node) {
        if(!tree || !Clazz) { // Validation
            if(!tree) {
                throw 'Undefined tree';
            } else {
                throw 'Undefined adapter class';
            }
        }
        this._data = {
            tree: tree,
            Clazz: Clazz,
            unit: !Array.isArray(tree)
        };
    }

    _newInstance(Clazz, tree, parentIndices, parent) {
        const instance = new Clazz(tree);
        instance._data.root = this._data.root;
        instance._data.parent = parent;
        instance._data.parentIndices = parentIndices;
        return instance;
    }

    getByTag(tag, Adapter = Node) {
        const tree = this._data.tree;
        const arrayTree = this._data.unit ? [tree] : tree;
        const arrayChildren = [], arrayParents = [];
        arrayTree.forEach((t, i) => {
            _get(t.by_tag, tag, []).forEach(v => {
               arrayChildren.push(v);
               arrayParents.push(i);
            });
        });
        return this._newInstance(Adapter, arrayChildren, arrayParents, this);
    }

    getByTags(tags, Adapter = Node) {
        const tree = this._data.tree;
        const arrayTree = this._data.unit ? [tree] : tree;
        const arrayChildren = [], arrayParents = [];
        arrayTree.forEach((tr, i) => {
            tags.forEach(tg => {
                _get(tr.by_tag, tg, []).forEach(v => {
                    arrayChildren.push(v);
                    arrayParents.push(i);
                });
            });
        });
        return this._newInstance(Adapter, arrayChildren, arrayParents, this);
    }

    getByTagPointer(tag, pointer, Adapter = Node) {
        const data = this._data;
        const tree = data.tree;
        const arrayTree = data.unit ? [tree] : tree;
        const arrayChildren = [], arrayParents = [];
        arrayTree.forEach((tr, i) => {
            const element = _get(_get(tr.by_tag_pointer, tag, {}), pointer, null);
            if(element !== null) {
                arrayChildren.push(element);
                arrayParents.push(i);
            }
        });
        return this._newInstance(Adapter, arrayChildren, arrayParents, this);
    }

    value() {
        const tree = this._data.tree;
        return this._data.unit ? tree.value : tree.map(t => t.value);
    }

    pointer() {
        const tree = this._data.tree;
        return this._data.unit ? tree.pointer : tree.map(t => t.pointer);
    }

    tag() {
        const tree = this._data.tree;
        return this._data.unit ? tree.tag : tree.map(t => t.tag);
    }

    nth(n) {
        const data = this._data;
        if(data.unit) {
            if(n !== 0) {
                throw `Undefined index: ${n}`;
            }
            return this;
        } else {
            const tree = data.tree[n];
            if(!tree) {
                throw `Undefined index: ${n}`;
            }
            return this._newInstance(data.Clazz, tree, [data.parentIndices[n]], data.parent);
        }
    }

    first() {
        return this.nth(0);
    }

    last() {
        return this.nth(this.count() - 1);
    }

    option() {
        const data = this._data;
        if(data.unit) {
            return this._newInstance(data.Clazz, [data.tree], data.parentIndices, data.parent);
        } else {
            return this._newInstance(data.Clazz, data.tree.slice(0, 1), data.parentIndices.slice(0, 1), data.parent);
        }
    }

    count() {
        const data = this._data;
        return data.unit ? 1 : data.tree.length;
    }

    length() {
        return this.count();
    }

    isEmpty() {
        const data = this._data;
        return !data.unit && !data.tree.length;
    }

    isUnit() {
        return this._data.unit;
    }

    isUnique() {
        const data = this._data;
        return data.unit || data.tree.length === 1;
    }

    parent() {
        const data = this._data;
        if(!data.parent) {
            throw 'Root node has no parent';
        }
        const parent = data.parent;
        if(data.unit) {
            return this._newInstance(parent._data.Clazz, parent._data.unit ? parent._data.tree : parent._data.tree[data.parentIndices[0]],
                [parent._data.parentIndices[data.parentIndices[0]]], parent._data.parent);
        } else {
            const treesSet = new Set();
            const parentTrees = [], parentIndices = [];
            data.parentIndices.forEach((v, i) => {
                const parentIndex = parent._data.parentIndices[v];
                const parentTree = parent._data.unit ? parent._data.tree : parent._data.tree[parentIndex];
                if(!treesSet.has(parentTree)) { // New unique parent
                    treesSet.add(parentTree);
                    parentTrees.push(parentTree);
                    parentIndices.push(parentIndex);
                }
            });
            return this._newInstance(parent._data.Clazz, parentTrees, parentIndices, parent._data.parent);
        }
    }

    getGedcom() {
        return this._data.root;
    }

    array() {
        const data = this._data;
        return data.unit ? [this] : data.tree.map(t => this._newInstance(data.Clazz, t, data.parent));
    }

    valueMap(f) {
        const tree = this._data.tree;
        return this._data.unit ? f(tree.value) : tree.map(t => f(t.value));
    }

    children(Adapter = Node) {
        const tree = this._data.tree;
        const arrayTree = this._data.unit ? [tree] : tree;
        const arrayChildren = [], arrayParents = [];
        arrayTree.forEach((tr, i) => {
            tr.children.forEach(c => {
                arrayChildren.push(c);
                arrayParents.push(i);
            });
        });
        return this._newInstance(Adapter, arrayChildren, arrayParents, this);
    }

    // TODO
}

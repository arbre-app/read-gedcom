import { _get } from '../utils';
import { FamilyRecord } from './FamilyRecord';
import { Name } from './Name';
import { Node } from './Node';
import { Tag } from '../tag';
import { Sex } from './Sex';

export class IndividualRecord extends Node {
    constructor(data) {
        super(data, IndividualRecord);
    }

    getName() {
        return this.getByTag(Tag.NAME, Name);
    }

    getSex() {
        return this.getByTag(Tag.SEX, Sex);
    }

    getFamilyAsChild() {
        const rootData = this._data.root._data;
        const tree = this._data.tree;
        const arrayTree = this._data.unit ? [tree] : tree;
        const arrayChildren = [], arrayParents = [];
        arrayTree.forEach((t, i) => {
            const family = rootData.as_child[t.pointer];
            if (family !== undefined) {
                arrayChildren.push(family);
                arrayParents.push(i);
            }
        });
        return this._newInstance(FamilyRecord, arrayChildren, arrayParents, this);
    }

    getFamilyAsSpouse() {
        const rootData = this._data.root._data;
        const tree = this._data.tree;
        const arrayTree = this._data.unit ? [tree] : tree;
        const arrayChildren = [], arrayParents = [];
        arrayTree.forEach((t, i) => {
            const families = _get(rootData.as_spouse, t.pointer, []);
            families.forEach(family => {
                arrayChildren.push(family);
                arrayParents.push(i);
            });
        });
        return this._newInstance(FamilyRecord, arrayChildren, arrayParents, this);
    }

}

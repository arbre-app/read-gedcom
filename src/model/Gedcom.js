import { _get } from '../utils';
import { FamilyRecord } from './FamilyRecord';
import { MultimediaRecord } from './MultimediaRecord';
import { Node } from './Node';
import { Header } from './Header';
import { IndividualRecord } from './IndividualRecord';
import { Tag } from '../tag';
import { NoteRecord } from './NoteRecord';
import { Record } from './Record';
import { SourceRecord } from './SourceRecord';
import { SubmitterRecord } from './SubmitterRecord';

export class Gedcom extends Node {
    constructor(data, clazz) {
        super(data, clazz || Gedcom);
        this._data.root = this; // Root is its own root
        this._data.parent = null; // Root has no parent
        this._data.parentIndices = []; // Operation not supported = empty array is acceptable
    }

    _createRecordBindings() {
        // Low level processing for performance
        const families = _get(this._data.tree.by_tag_pointer, Tag.FAMILY, {});
        const asSpouse = {}, asChild = {};
        for (const familyId in families) {
            const familyData = families[familyId];
            for (const spouseType of [Tag.HUSBAND, Tag.WIFE]) {
                for (const spouse of _get(familyData.by_tag, spouseType, [])) {
                    const spouseId = spouse.value;
                    if (asSpouse[spouseId] !== undefined) {
                        asSpouse[spouseId].push(familyData);
                    } else {
                        asSpouse[spouseId] = [familyData];
                    }
                }
            }
            for (const child of _get(familyData.by_tag, Tag.CHILD, [])) {
                const childId = child.value;
                if (asChild[childId] !== undefined) {
                    throw new Error(`Individual ${childId} is a child of both ${asChild[childId]} and ${familyId}`);
                } else {
                    asChild[childId] = familyData;
                }
            }
        }
        this._data.as_spouse = asSpouse;
        this._data.as_child = asChild;
    }

    getHeader() {
        return this.get(Tag.HEADER, Header);
    }

    getRecord(tag, id, Adapter = Record) {
        // undefined and null are considered as wildcards
        const tagArray = tag != null ? (Array.isArray(tag) ? tag : [tag]) : null;
        const idArray = id != null ? (Array.isArray(id) ? id : [id]) : null;

        const data = this._data;
        const tree = data.tree;
        const arrayTree = data.unit ? [tree] : tree;
        const arrayChildren = [], arrayParents = [];
        arrayTree.forEach((tr, i) => {
            let tagMatchedObjs;
            if (tagArray !== null) { // Array of tags
                tagMatchedObjs = tagArray.map(tag => _get(tr.by_tag_pointer, tag, {}));
            } else { // All tags
                tagMatchedObjs = [];
                for (const tag in tr.by_tag_pointer) {
                    tagMatchedObjs.push(tr.by_tag_pointer[tag]);
                }
            }
            tagMatchedObjs.forEach(obj => {
                if (idArray !== null) { // Array of ids
                    idArray.forEach(id => {
                        const element = obj[id];
                        if(element !== undefined) {
                            arrayChildren.push(element);
                            arrayParents.push(i);
                        }
                    });
                } else { // All ids
                    for (const id in obj) {
                        const element = obj[id];
                        arrayChildren.push(element);
                        arrayParents.push(i);
                    }
                }
            });
        });
        return this._newInstance(Adapter, arrayChildren, arrayParents, this);
    }

    getSubmitterRecord(id) {
        return this.getRecord(Tag.SUBMITTER, id, SubmitterRecord);
    }

    getIndividualRecord(id) {
        return this.getRecord(Tag.INDIVIDUAL, id, IndividualRecord);
    }

    getFamilyRecord(id) {
        return this.getRecord(Tag.FAMILY, id, FamilyRecord);
    }

    getMultimediaRecord(id) {
        return this.getRecord(Tag.OBJECT, id, MultimediaRecord);
    }

    getNoteRecord(id) {
        return this.getRecord(Tag.NOTE, id, NoteRecord);
    }

    getSourceRecord(id) {
        return this.getRecord(Tag.SOURCE, id, SourceRecord);
    }

    // TODO
}

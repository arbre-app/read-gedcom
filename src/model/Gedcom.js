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
        if (data.length !== 1) {
            throw new Error('Root should be a single node');
        }
        this._data.root = this; // Root is its own root
        this._data.parent = null; // Root has no parent
        this._data.parentIndices = []; // Operation not supported = empty array is acceptable
    }

    _createRecordBindings() {
        // Low level processing for performance
        const families = _get(this._data.tree[0].by_tag_pointer, Tag.FAMILY, {});
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
                    asChild[childId].push(familyData);
                } else {
                    asChild[childId] = [familyData];
                }
            }
        }
        this._data.as_spouse = asSpouse;
        this._data.as_child = asChild;
    }

    /**
     * @param q
     * @returns {Header}
     */
    getHeader(q) {
        return this.get(Tag.HEADER, q, Header);
    }

    getRecord(tag, id, q, Adapter = Record) {
        // undefined and null are considered as wildcards
        const tagArray = tag != null ? (Array.isArray(tag) ? tag : [tag]) : null;
        const idArray = id != null ? (Array.isArray(id) ? id : [id]) : null;
        const withLimit = q != null;
        if (withLimit && !Number.isInteger(q)) {
            throw new Error('The quantifier provided is not an integer');
        }

        const data = this._data;
        const arrayChildren = [], arrayParents = [];
        data.tree.forEach((tr, i) => {
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
                        if(element !== undefined && (!withLimit || q > 0)) { // A bit pointless
                            arrayChildren.push(element);
                            arrayParents.push(i);
                        }
                    });
                } else { // All ids
                    let j = 0;
                    for (const id in obj) {
                        if (withLimit && j >= q) {
                            break;
                        }
                        const element = obj[id];
                        arrayChildren.push(element);
                        arrayParents.push(i);
                        j++;
                    }
                }
            });
        });
        // The parent should be the root, otherwise this creates memory leaks (and is not useful anyway)
        return this._newInstance(Adapter, arrayChildren, arrayParents, this.getGedcom());
    }

    getSubmitterRecord(id, q) {
        return this.getRecord(Tag.SUBMITTER, id, q, SubmitterRecord);
    }

    getIndividualRecord(id, q) {
        return this.getRecord(Tag.INDIVIDUAL, id, q, IndividualRecord);
    }

    getFamilyRecord(id, q) {
        return this.getRecord(Tag.FAMILY, id, q, FamilyRecord);
    }

    getMultimediaRecord(id, q) {
        return this.getRecord(Tag.OBJECT, id, q, MultimediaRecord);
    }

    getNoteRecord(id, q) {
        return this.getRecord(Tag.NOTE, id, q, NoteRecord);
    }

    getSourceRecord(id, q) {
        return this.getRecord(Tag.SOURCE, id, q, SourceRecord);
    }

    // TODO
}

import { _get } from '../utils';
import { Node } from './Node';
import { Header } from './Header';
import { IndividualRecord } from './IndividualRecord';
import { Tag } from '../tag';

export class Gedcom extends Node {
    constructor(data) {
        super(data, Gedcom);
        this._data.root = this; // Root is its own root
        this._data.parent = null; // Root has no parent
        this._data.parentIndices = []; // Operation not supported = empty array is acceptable
    }

    _createRecordBindings() {
        // Low level processing for performance
        const families = _get(this._data.tree.by_tag_pointer, Tag.FAMILY, {});
        const asSpouse = {}, asChild = {};
        for(const familyId in families) {
            const familyData = families[familyId];
            for(const spouseType of [Tag.HUSBAND, Tag.WIFE]) {
                for(const spouse of _get(familyData.by_tag, spouseType, [])) {
                    const spouseId = spouse.value;
                    if(asSpouse[spouseId] !== undefined) {
                        asSpouse[spouseId].push(familyData);
                    } else {
                        asSpouse[spouseId] = [familyData];
                    }
                }
            }
            for(const child of _get(familyData.by_tag, Tag.CHILD, [])) {
                const childId = child.value;
                if(asChild[childId] !== undefined) {
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
        return this.getByTag(Tag.HEADER, Header);
    }

    getIndividualRecord(id) {
        return this.getByTagPointer(Tag.INDIVIDUAL, id, IndividualRecord);
    }

    getFamilyRecord(id) {
        return this.getByTagPointer(Tag.FAMILY, id, Node); // TODO
    }

    // TODO
}

import fs from 'fs';
import { describe, it } from 'mocha';
import { assert } from 'chai';
import { parseGedcom, TreeNodeRoot, indexTree } from '../src';

describe('Tree serialization', () => {
    const buffer = fs.readFileSync('./tests/data/sample555.ged');
    const gedcomWithIndexShown: TreeNodeRoot = parseGedcom(buffer),
        gedcomWithIndexHidden: TreeNodeRoot = parseGedcom(buffer, { doHideIndex: true }),
        gedcomWithoutIndex: TreeNodeRoot = parseGedcom(buffer, { noIndex: true }),
        gedcomFrozen: TreeNodeRoot = parseGedcom(buffer, { doFreeze: true });

    it('should correctly serialize and deserialize the tree', () => {
        const roundtrip = (obj: any): any => JSON.parse(JSON.stringify(obj));

        const desGedcomWithIndex = roundtrip(gedcomWithIndexShown);
        assert.deepEqual(desGedcomWithIndex, gedcomWithIndexShown);
        const desGedcomWithoutIndex1 = roundtrip(gedcomWithIndexHidden);
        assert.deepEqual(desGedcomWithoutIndex1, gedcomWithoutIndex);
        const desGedcomWithoutIndex2 = roundtrip(gedcomWithoutIndex);
        assert.deepEqual(desGedcomWithoutIndex2, gedcomWithoutIndex);

        indexTree(desGedcomWithoutIndex1);
        assert.deepEqual(desGedcomWithoutIndex1, gedcomWithIndexShown);
        indexTree(desGedcomWithoutIndex2);
        assert.deepEqual(desGedcomWithoutIndex2, gedcomWithIndexShown);
    });

    it('should freeze the entire tree when asked to do so', () => {
        assert(Object.isFrozen(gedcomFrozen));
        assert(Object.isFrozen(gedcomFrozen.children));
        assert(Object.isFrozen(gedcomFrozen._index));
        assert(Object.isFrozen(gedcomFrozen._index?.byTag));
        assert(Object.isFrozen(gedcomFrozen.children[0].children));
    });
});

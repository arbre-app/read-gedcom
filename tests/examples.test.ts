import fs from 'fs';
import { describe, it } from 'mocha';
import { assert } from 'chai';
import { readGedcom, SelectionGedcom, SelectionIndividualRecord } from '../src';

describe('Documentation examples tested on sample Gedcom file', () => {
    const gedcom: SelectionGedcom = readGedcom(fs.readFileSync('./tests/data/sample555.ged'));

    const queryIndividual = (gedcom: SelectionGedcom, query: string): SelectionIndividualRecord => {
        const tokenize = (name: string) => name.trim().toLowerCase().split(/ +/);
        const queryTokens = tokenize(query);
        return gedcom.getIndividualRecord().filterSelect(individual => {
            const names = individual.getName().valueAsParts()[0];
            if (names !== null) {
                const namesTokens = names.filter((v): v is string => !!v).flatMap(tokenize);
                return queryTokens.every(s => namesTokens.includes(s));
            }
            return false;
        });
    };

    it('should query individuals by their names in a fuzzy way', () => {
        assert(queryIndividual(gedcom, '').length === 0);
        assert.deepStrictEqual(queryIndividual(gedcom, 'eugene').pointer(), ['@I1@']);
        assert.deepStrictEqual(queryIndividual(gedcom, 'WILSON ANN').pointer(), ['@I2@']);
        assert.deepStrictEqual(queryIndividual(gedcom, ' Williams  ').pointer(), ['@I1@', '@I3@']);
    });

    const checkNoCycles = (gedcom: SelectionGedcom) => {
        const PERMANENT_MARK = true, TEMPORARY_MARK = false;

        const marks: { [id: string]: (typeof PERMANENT_MARK) | (typeof TEMPORARY_MARK) } = {};
        const nonPermanentlyMarked = new Set();

        gedcom.getIndividualRecord().arraySelect().forEach(individual => nonPermanentlyMarked.add(individual.pointer()[0]));

        const visit = (individual: SelectionIndividualRecord) => {
            const id = individual.pointer()[0] as string;
            const mark = marks[id];
            if (mark === PERMANENT_MARK) {
                return;
            } else if (mark === TEMPORARY_MARK) {
                throw new Error('The Gedcom file contains a cycle!');
            }
            nonPermanentlyMarked.add(id);
            marks[id] = TEMPORARY_MARK;
            individual.getFamilyAsSpouse().arraySelect()
                .filter(family => [family.getHusband(), family.getWife()].some(ref => marks[ref.value()[0] as string] === undefined))
                .forEach(family => family.getChild().getIndividualRecord().arraySelect().forEach(child => visit(child)));
            nonPermanentlyMarked.delete(id);
            marks[id] = PERMANENT_MARK;
        };

        while (nonPermanentlyMarked.size > 0) {
            const firstId = nonPermanentlyMarked.values().next().value;
            const individual = gedcom.getIndividualRecord(firstId);
            visit(individual);
        }
    };

    it('should correctly identify the absence of cycles', () => {
        checkNoCycles(gedcom);
    });

    const topologicalIndividualSort = (gedcom: SelectionGedcom) => {
        const PERMANENT_MARK = true, TEMPORARY_MARK = false;

        const sorted: string[] = []; // <-- A sorted array of individuals (children first, parents after)
        const marks: { [id: string]: (typeof PERMANENT_MARK) | (typeof TEMPORARY_MARK) } = {};
        const nonPermanentlyMarked = new Set();

        gedcom.getIndividualRecord().arraySelect().forEach(individual => nonPermanentlyMarked.add(individual.pointer()[0]));

        const visit = (individual: SelectionIndividualRecord) => {
            const id = individual.pointer()[0] as string;
            const mark = marks[id];
            if (mark === PERMANENT_MARK) {
                return;
            } else if (mark === TEMPORARY_MARK) {
                throw new Error('The Gedcom file contains a cycle!');
            }
            nonPermanentlyMarked.add(id);
            marks[id] = TEMPORARY_MARK;
            individual.getFamilyAsSpouse().arraySelect()
                .filter(family => [family.getHusband(), family.getWife()].some(ref => marks[ref.value()[0] as string] === undefined))
                .forEach(family => family.getChild().getIndividualRecord().arraySelect().forEach(child => visit(child)));
            nonPermanentlyMarked.delete(id);
            marks[id] = PERMANENT_MARK;
            sorted.push(id); // <-- Build the sorted array
        };

        while (nonPermanentlyMarked.size > 0) {
            const firstId = nonPermanentlyMarked.values().next().value;
            const individual = gedcom.getIndividualRecord(firstId);
            visit(individual);
        }

        return sorted; // <-- Return the ordering
    };

    it('should sort the individuals in a topological order', () => {
        const ordering = topologicalIndividualSort(gedcom);
        assert(ordering.length === gedcom.getIndividualRecord().length);
        const set = new Set();
        ordering.forEach(id => {
            gedcom.getIndividualRecord(id).getFamilyAsSpouse().getChild().getIndividualRecord().pointer().forEach(idChild => assert(set.has(idChild)));
            set.add(id);
        });
    });

    const connectedComponents = (gedcom: SelectionGedcom) => {
        const notVisited: Set<string | null> = new Set();

        gedcom.getIndividualRecord().arraySelect().forEach(individual => notVisited.add(individual.pointer()[0]));

        const bfs = (individual: SelectionIndividualRecord) => {
            const id = individual.pointer()[0] as string;
            let toVisit: Set<string | null> = new Set([id]);
            notVisited.delete(id);
            const visited: string[] = [];
            while (toVisit.size > 0) {
                const nextVisit: Set<string | null> = new Set();
                toVisit.forEach(id => {
                    if (id) {
                        const individual = gedcom.getIndividualRecord(id);
                        individual.getFamilyAsSpouse().concatenate(individual.getFamilyAsChild())
                            .arraySelect().forEach(family =>
                            [family.getHusband(), family.getWife(), family.getChild()].flatMap(ref => ref.arraySelect())
                                .map(ref => ref.value()[0]).filter(id => id).filter(id => notVisited.has(id)).filter(id => !toVisit.has(id))
                                .forEach(id => nextVisit.add(id)),
                        );
                        visited.push(id);
                    }
                });

                nextVisit.forEach(id => notVisited.delete(id));
                toVisit = nextVisit;
            }
            return visited;
        };

        const components = [];
        while (notVisited.size > 0) {
            const firstId = notVisited.values().next().value;
            const individual = gedcom.getIndividualRecord(firstId);
            components.push(bfs(individual));
        }

        return components;
    };

    it('should identify the connected components', () => {
        const components = connectedComponents(gedcom);
        assert(components.length === 1);
        assert(components[0].length === 3);
    });
});

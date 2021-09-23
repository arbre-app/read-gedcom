import { describe, it } from 'mocha';
import { assert } from 'chai';
import fs from 'fs';
import {readGedcom, SelectionAny, Tag, TreeNode} from '../src';

describe('Gedcom selection API coverage', () => {

    const filenames = ['sample555.ged', 'TGC55C.ged', 'TGC551.ged'];

    it('should find a method to select every node', () => {
        filenames.forEach(filename => {
            const buffer = fs.readFileSync(`./tests/data/${filename}`);
            const gedcom = readGedcom(buffer);
            const nodeBySourceIndex: { [indexSource: number]: TreeNode } = {}; // Won't include the root node
            const pathBySourceIndex: { [sourceIndex: number]: string[] } = {};
            const visit = (node: TreeNode, path: string[] = []) =>
                node.children.forEach(child => {
                    const newPath = [...path, child.tag as string];
                    nodeBySourceIndex[child.indexSource] = child;
                    pathBySourceIndex[child.indexSource] = newPath;
                    visit(child, newPath);
                });
            visit(gedcom[0]);

            const getMethods = (object: any): string[] => {
                const methods = [];
                for (const member in object) {
                    if((typeof object[member]) === 'function') {
                        methods.push(member);
                    }
                }
                return methods;
            };
            const getSelectionChildrenMethods = (selection: SelectionAny): string[] =>
                getMethods(selection).filter(s => /^get[A-Z]/.test(s));
            const coveredIndices = new Set<number>();
            const exploreApi = (selection: SelectionAny) => {
                let toVisit: { selection: SelectionAny, path: string[] }[] = [{ selection, path: [] }];
                while (toVisit.length > 0) {
                    const newToVisit: typeof toVisit = [];
                    toVisit.forEach(({ selection, path }) => {
                        const methods = getSelectionChildrenMethods(selection);
                        methods.forEach(method => {
                            const childSelection = (selection as any)[method].apply(selection) as SelectionAny;
                            if (childSelection.length > 0) {
                                const newPath = [...path, childSelection.tag()[0] as string];
                                const nodes = childSelection.array();
                                if (!nodes.some(node => coveredIndices.has(node.indexSource))) { // Don't follow backward links
                                    nodes.forEach(node => coveredIndices.add(node.indexSource));
                                    childSelection.arraySelect().forEach(selectionChildOne => newToVisit.push({ selection: selectionChildOne, path: newPath }));
                                }
                            } // Otherwise stop exploration (fruitless branch)
                        });
                    });
                    toVisit = newToVisit;
                }
            };
            exploreApi(gedcom);

            const ignoredTags: (Tag | string)[] = [
                // Useless
                Tag.Trailer,
                // Obsoleted in 5.5.5
                Tag.Alias,
                Tag.AncestorInterest,
                Tag.AncestralFileNumber,
                Tag.BaptismLDS,
                Tag.ConfirmationLDS,
                Tag.DescendantInt,
                Tag.Endowment,
                Tag.Ordination,
                Tag.Restriction,
                Tag.SealingChild,
                Tag.SealingSpouse,
                Tag.SocialSecurityNumber,
                Tag.Status,
                Tag.Submission,
                // Duplicate
                Tag.Blessing,
                // Non standard tags
                '_HME',
            ];
            const ignoredPaths: (Tag | string)[][] = [
                // Duplicate/obsolete
                [Tag.Submitter, Tag.Language],
                [Tag.Submitter, Tag.RecordFileNumber],
                [Tag.Individual, Tag.RecordFileNumber],
                [Tag.Individual, Tag.Submitter],
                [Tag.Family, Tag.Submitter],
                [Tag.Source, Tag.Repository, Tag.CallNumber, Tag.Media],
                [Tag.Source, Tag.Repository, Tag.Note],
                // Non standard
                [Tag.Header, Tag.Character, Tag.Version],
                [Tag.Family, Tag.Engagement, Tag.Age],
                [Tag.Individual, Tag.Death, Tag.Place, Tag.Format],
                [Tag.Individual, Tag.Death, Tag.Place, Tag.Source],
                [Tag.Individual, Tag.Source, Tag.Text],
                // Other reason
                [Tag.Header, Tag.Place],
                [Tag.Header, Tag.Place, Tag.Format],
                // Special
                [Tag.Individual, Tag.Note, Tag.Source], // TODO
            ];

            const ignoredTagsSet = new Set(ignoredTags);
            const hashPath = (path: string[]): string => path.join('.');
            const ignoredPathsSet = new Set(ignoredPaths.map(hashPath));
            const isIgnored = (path: string[]): boolean => ignoredPathsSet.has(hashPath(path));

            const missing = Object.values(nodeBySourceIndex)
                .filter(node => !coveredIndices.has(node.indexSource))
                .filter(node => {
                    const path = pathBySourceIndex[node.indexSource];
                    return !path.some(tag => ignoredTagsSet.has(tag)) &&
                        path.slice().reverse()[1] !== Tag.Object &&
                        !isIgnored(pathBySourceIndex[node.indexSource]);
                })
            assert.isEmpty(missing);
        });
    });
});

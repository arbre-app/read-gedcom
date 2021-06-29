import { GedcomTag } from '../tag';
import {GedcomTree} from "../tree";

/**
 * Builds a tree from tokenized Gedcom lines.
 * @param lines An iterable of regular expression matches, which format is defined in {@link tokenize}
 * @param noInlineContinuations See {@link GedcomTreeReadingOptions.noInlineContinuations}
 */
export const buildTree = (lines: Iterable<RegExpExecArray>, noInlineContinuations: boolean = false): GedcomTree.NodeRoot => {
    let i = 0;
    let currentLevel = -1; // Current level
    const stack: GedcomTree.Node[] = [{ tag: null, pointer: null, value: null, indexSource: -1, indexRelative: 0, children: [] }];
    for(let line of lines) {
        const [_, levelStr, pointer, tag, value] = line;
        const level = parseInt(levelStr);
        const isSameOrUpperLevel = level <= currentLevel, isDownLevel = level === currentLevel + 1;

        if(level < 0) {
            throw new Error(`Illegal nesting level value at line ${i + 1} (got ${level})`)
        }
        if(!isSameOrUpperLevel && !isDownLevel) {
            throw new Error(`Bad nesting level at line ${i + 1} (current is ${currentLevel}, got ${level})`);
        }

        const levelDifference = currentLevel - level + 1;
        for(let j = 0; j < levelDifference; j++) { // Go up
            stack.pop();
        }

        const parent = stack[stack.length - 1];
        const siblings = parent.children;
        if(tag === GedcomTag.Concatenation && !noInlineContinuations) { // TODO: (potentially) inefficient string concatenation
            if(pointer) {
                throw new Error(`Illegal concatenation format at line ${i + 1}`);
            }
            if(!parent) {
                throw new Error(`Concatenation with no parent at line ${i + 1}`);
            }
            if(parent.value == null) {
                parent.value = '';
            }
            parent.value += value;
            currentLevel = level - 1;
        } else if(tag === GedcomTag.Continuation && !noInlineContinuations) {
            if(pointer) {
                throw new Error(`Illegal concatenation format at line ${i + 1}`);
            }
            if(!parent) {
                throw new Error(`Continuation with no parent at line ${i + 1}`);
            }
            const separator = '\n'; // TODO: hardcoded separator
            if(parent.value == null) {
                parent.value = '';
            }
            parent.value += separator + value;
            currentLevel = level - 1;
        } else {
            const child: GedcomTree.Node = { tag, pointer: pointer ?? null, value: value ?? null, indexSource: i, indexRelative: parent.children.length, children: [] }; // TODO check for undefined
            siblings.push(child);

            if (pointer && level > 0) {
                throw new Error(`Record must be a top-level definition at line ${i + 1}`);
            }

            stack.push(child);
            currentLevel = level;
        }

        i++;
    }

    return stack[0] as GedcomTree.NodeRoot; // The top of the stack is the root node
}

import { GedcomTag } from '../tag';
import { GedcomTree } from '../tree';
import { GedcomError } from './error';

const PROGRESS_INTERVAL = 50000;

/**
 * Builds a tree from tokenized Gedcom lines.
 * @param lines An iterable of regular expression matches, which format is defined in {@link tokenize}
 * @param noInlineContinuations See {@link GedcomReadingOptions.noInlineContinuations}
 * @param progressCallback See {@link GedcomReadingPhase.progressCallback}
 */
export const buildTree = (lines: Iterable<RegExpExecArray>,
                          noInlineContinuations = false,
                          progressCallback: ((charsRead: number) => void) | null = null): GedcomTree.NodeRoot => {
    if (progressCallback) {
        progressCallback(0);
    }

    let i = 0;
    let charsRead = 0;
    let currentLevel = -1; // Current level
    const stack: GedcomTree.Node[] = [{ tag: null, pointer: null, value: null, indexSource: -1, indexRelative: 0, children: [] }];
    for (const line of lines) {
        const [lineStr, levelStr, pointer, tag, value] = line;
        charsRead += lineStr.length;
        const level = parseInt(levelStr);
        const isSameOrUpperLevel = level <= currentLevel, isDownLevel = level === currentLevel + 1;

        if (level < 0 || (!isSameOrUpperLevel && !isDownLevel)) {
            throw new GedcomError.InvalidNestingError(`Illegal nesting level at line ${i + 1} (current is ${currentLevel}, got ${level})`, i + 1, currentLevel, level);
        }

        const levelDifference = currentLevel - level + 1;
        for (let j = 0; j < levelDifference; j++) { // Go up
            stack.pop();
        }

        const parent = stack[stack.length - 1];
        const siblings = parent.children;
        if (tag === GedcomTag.Concatenation && !noInlineContinuations) { // TODO: (potentially) inefficient string concatenation
            if (pointer) {
                throw new GedcomError.InvalidConcatenationError(`Illegal concatenation format at line ${i + 1}`, i + 1, GedcomTag.Concatenation);
            }
            if (!parent) {
                throw new GedcomError.InvalidConcatenationError(`Concatenation with no parent at line ${i + 1}`, i + 1, GedcomTag.Concatenation);
            }
            if (parent.value == null) {
                parent.value = '';
            }
            parent.value += value ?? '';
            currentLevel = level - 1;
        } else if (tag === GedcomTag.Continuation && !noInlineContinuations) {
            if (pointer) {
                throw new GedcomError.InvalidConcatenationError(`Illegal continuation format at line ${i + 1}`, i + 1, GedcomTag.Concatenation);
            }
            if (!parent) {
                throw new GedcomError.InvalidConcatenationError(`Continuation with no parent at line ${i + 1}`, i + 1, GedcomTag.Concatenation);
            }
            const separator = '\n'; // TODO: hardcoded separator
            if (parent.value == null) {
                parent.value = '';
            }
            parent.value += separator + (value ?? '');
            currentLevel = level - 1;
        } else {
            const child: GedcomTree.Node = { tag, pointer: pointer ?? null, value: value ?? null, indexSource: i, indexRelative: parent.children.length, children: [] };
            siblings.push(child);

            if (pointer && level > 0) {
                throw new GedcomError.InvalidRecordDefinitionError(`Record must be a top-level definition at line ${i + 1}`, i + 1);
            }

            stack.push(child);
            currentLevel = level;
        }

        i++;

        if (progressCallback && i % PROGRESS_INTERVAL === 0) {
            progressCallback(charsRead);
        }
    }

    if (progressCallback) {
        progressCallback(charsRead);
    }

    return stack[0] as GedcomTree.NodeRoot; // The top of the stack is the root node
};

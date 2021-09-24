import { Tag } from '../tag';
import { TreeNode, TreeNodeRoot } from '../tree';
import {
    ErrorInvalidConcatenation,
    ErrorInvalidNesting,
    ErrorInvalidRecordDefinition,
} from './error';

const PROGRESS_INTERVAL = 50000;

/**
 * Builds a tree from tokenized Gedcom lines.
 * @param lines An iterable of regular expression matches, which format is defined in {@link tokenize}
 * @param noInlineContinuations See {@link GedcomReadingOptions.noInlineContinuations}
 * @param progressCallback See {@link GedcomReadingPhase.progressCallback}
 */
export const buildTree = (lines: Iterable<RegExpExecArray>,
                          noInlineContinuations = false,
                          progressCallback: ((charsRead: number) => void) | null = null): TreeNodeRoot => {
    if (progressCallback) {
        progressCallback(0);
    }

    let i = 0;
    let charsRead = 0;
    let currentLevel = -1; // Current level
    const stack: TreeNode[] = [{ tag: null, pointer: null, value: null, indexSource: -1, indexRelative: 0, children: [] }];
    for (const line of lines) {
        const [lineStr, levelStr, pointer, tag, value] = line;
        // There is an unsolvable ambiguity here, so we just try our best and assume it is correct
        const valueUnescaped = value ? value.replace(/@@/g, '@') : value;
        charsRead += lineStr.length;
        const level = parseInt(levelStr);
        const isSameOrUpperLevel = level <= currentLevel, isDownLevel = level === currentLevel + 1;

        if (level < 0 || (!isSameOrUpperLevel && !isDownLevel)) {
            throw new ErrorInvalidNesting(`Illegal nesting level at line ${i + 1} (current is ${currentLevel}, got ${level})`, i + 1, currentLevel, level);
        }

        const levelDifference = currentLevel - level + 1;
        for (let j = 0; j < levelDifference; j++) { // Go up
            stack.pop();
        }

        const parent = stack[stack.length - 1];
        const siblings = parent.children;
        if (tag === Tag.Concatenation && !noInlineContinuations) { // TODO: (potentially) inefficient string concatenation
            if (pointer) {
                throw new ErrorInvalidConcatenation(`Illegal concatenation format at line ${i + 1}`, i + 1, Tag.Concatenation);
            }
            if (!parent) {
                throw new ErrorInvalidConcatenation(`Concatenation with no parent at line ${i + 1}`, i + 1, Tag.Concatenation);
            }
            if (parent.value == null) {
                parent.value = '';
            }
            parent.value += valueUnescaped ?? '';
            currentLevel = level - 1;
        } else if (tag === Tag.Continuation && !noInlineContinuations) {
            if (pointer) {
                throw new ErrorInvalidConcatenation(`Illegal continuation format at line ${i + 1}`, i + 1, Tag.Continuation);
            }
            if (!parent) {
                throw new ErrorInvalidConcatenation(`Continuation with no parent at line ${i + 1}`, i + 1, Tag.Continuation);
            }
            const separator = '\n'; // TODO: hardcoded separator
            if (parent.value == null) {
                parent.value = '';
            }
            parent.value += separator + (valueUnescaped ?? '');
            currentLevel = level - 1;
        } else {
            const child: TreeNode = { tag, pointer: pointer ?? null, value: valueUnescaped ?? null, indexSource: i, indexRelative: parent.children.length, children: [] };
            siblings.push(child);

            if (pointer && level > 0) {
                throw new ErrorInvalidRecordDefinition(`Record must be a top-level definition at line ${i + 1}`, i + 1);
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

    return stack[0] as TreeNodeRoot; // The top of the stack is the root node
};

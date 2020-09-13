import { Tag } from '../tag';

export function makeTree(input) {
    let currentLevel = -1; // Current level
    const stack = [{ children: [], by_tag: {}, by_tag_pointer: {} }];
    for(let i = 0; i < input.length; i++) {
        const line = input[i];

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
        if(tag === Tag.CONCATENATION) { // TODO: inefficient string concatenation
            if(pointer) {
                throw new Error(`Illegal concatenation format at line ${i + 1}`);
            }
            if(!parent) {
                throw new Error(`Concatenation with no parent at line ${i + 1}`);
            }
            parent.value += value;
        } else if(tag === Tag.CONTINUATION) {
            if(pointer) {
                throw new Error(`Illegal concatenation format at line ${i + 1}`);
            }
            if(!parent) {
                throw new Error(`Continuation with no parent at line ${i + 1}`);
            }
            const separator = '\n'; // TODO: hardcoded separator
            parent.value += separator + value;
        } else {
            const child = {
                pointer: pointer,
                tag: tag,
                value: value,
                children: [],
                by_tag: {},
                by_tag_pointer: {}
            };
            siblings.push(child);

            if(pointer) {
                let by_tag_pointer = parent.by_tag_pointer[tag];
                if(!by_tag_pointer) {
                    by_tag_pointer = {};
                    parent.by_tag_pointer[tag] = by_tag_pointer;
                } else if(by_tag_pointer[pointer]) {
                    throw new Error('Duplicate key'); // TODO: improve message
                }
                by_tag_pointer[pointer] = child;
            } else {
                let by_tag = parent.by_tag[tag];
                if(!by_tag) {
                    by_tag = [];
                    parent.by_tag[tag] = by_tag;
                }
                by_tag.push(child);
            }

            stack.push(child);
            currentLevel = level;
        }
    }

    return stack[0];
}

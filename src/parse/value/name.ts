import { ValueNameParts } from './ValueNameParts';

// eslint-disable-next-line
const rNameParts = /^(?:([^\/]*)|(?:(?:([^\/]*?) ?)?\/([^\/]*)\/(?: ?([^\/]*))?))$/;

/**
 * Parses a name value into three potentially undefined name parts.
 * @param value The value to parse
 * @category Value parsers
 */
export const parseNameParts = (value: string | null): ValueNameParts | null => {
    if (!value) {
        return null;
    }
    const groups = rNameParts.exec(value);
    if (!groups) {
        return null;
    }
    if (groups[1] === undefined) {
        return [groups[2], groups[3], groups[4]];
    } else {
        return [groups[1], undefined, undefined];
    }
};

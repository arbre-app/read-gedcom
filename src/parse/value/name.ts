// eslint-disable-next-line
const rNameParts = /^(?:([^\/]*)|(?:(?:([^\/]*?) ?)?\/([^\/]*)\/(?: ?([^\/]*))?))$/;

/**
 * @param value
 * @category Value parsers
 */
export const parseNameParts = (value: string | null): [string, string, string] | [undefined, string, string] | [string, string, undefined] | [undefined, string, undefined] | [string, undefined, undefined] | null => {
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

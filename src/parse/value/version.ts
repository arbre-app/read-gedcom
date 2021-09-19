const rVersion = /^(0|[1-9][0-9]{0,2})\.(0|[1-9][0-9]{0,2})(?:\.(0|[1-9][0-9]{0,2}))?$/;

/**
 * Parses a version value into version number parts.
 * @param value The value to parse
 * @category Value parsers
 */
export const parseVersionParts = (value: string | null): (number[] & ([number, number] | [number, number, number])) | null => {
    if (!value) {
        return null;
    }
    const groups = rVersion.exec(value);
    if (!groups) {
        return null;
    }
    const numbers: number[] = [];
    for (let i = 0; i < 3 && groups[i + 1]; i++) {
        numbers.push(parseInt(groups[i + 1]));
    }
    return numbers as [number, number] | [number, number, number];
};

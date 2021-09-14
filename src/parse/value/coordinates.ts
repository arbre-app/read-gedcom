const parseCoordinate = (regex: RegExp, orientation: { [char: string]: number }, value: string | null): number | null => {
    if (!value) {
        return null;
    }
    const groups = regex.exec(value);
    if (!groups) {
        return null;
    }
    const sign = groups[1] !== undefined ? orientation[groups[1]] : groups[2] === '-' ? -1 : 1;
    const decimal = parseFloat(groups[3]);
    return sign * decimal;
};

/**
 * @param value
 * @category Value parsers
 */
export const parseLatitude = (value: string | null): number | null => {
    const rLatitude = /^(?:([NS])|([+-]?))([0-9]{1,2}(?:\.[0-9]{1,6})?)$/;
    return parseCoordinate(rLatitude, { N: 1, S: -1 }, value);
};

/**
 * @param value
 * @category Value parsers
 */
export const parseLongitude = (value: string | null): number | null => {
    const rLongitude = /^(?:([EW])|([+-]?))([0-9]{1,3}(?:\.[0-9]{1,6})?)$/;
    return parseCoordinate(rLongitude, { E: 1, W: -1 }, value);
};

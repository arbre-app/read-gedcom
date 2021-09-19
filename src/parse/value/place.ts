/**
 * Parses a place value into parts.
 * It essentially performs a split on the comma character.
 * @param value The value to parse
 * @category Value parsers
 */
export const parsePlaceParts = (value: string | null): string[] | null => {
    if (value === null) {
        return null;
    }

    return value.split(/, ?/); // Space is mandatory according to specification, but we still accept it if it's missing
};

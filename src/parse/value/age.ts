import { ValueAge } from './ValueAge';

/**
 * Parses an age value.
 * @param value The value to parse
 * @category Value parsers
 */
export const parseAge = (value: string | null): ValueAge | null => {
    if (!value) {
        return null;
    }
    const sign = '<>'.indexOf(value[0]);
    const hasSign = sign >= 0;
    const remaining = hasSign ? value.substring(1) : value;
    const isChild = remaining === 'CHILD';
    const isInfant = remaining === 'INFANT';
    const isStillborn = remaining === 'STILLBORN';
    const common = { isGreaterThan: sign === 1, isLessThan: sign === 0, isChild, isInfant, isStillborn };
    if (isChild || isInfant || isStillborn) {
        return { hasDate: false, ...common };
    } else {
        const parts = remaining.split(' ');
        if (parts.length > 3) {
            return null;
        }
        const rNumber = /^(?:0|[1-9][0-9]{0,2})$/;
        const rFormat = /^(?:ymd|y|m|d|ym|yd|md)$/;
        const result = parts.map(part => {
            if (part.length < 2) {
                return null;
            }
            const suffix = part[part.length - 1];
            if (!'ymd'.includes(suffix)) {
                return null;
            }
            const init = part.substring(0, part.length - 1);
            if (init.match(rNumber) !== null) {
                const number = parseInt(init);
                if ((suffix === 'd' && number > 365) || (suffix === 'm' && number > 11)) {
                    return null;
                }
                return [suffix, number] as const;
            } else {
                return null;
            }
        });
        if (result.includes(null)) {
            return null;
        }
        const resultNonNull = result as [string, number][];
        if (resultNonNull.map(r => r[0]).join('').match(rFormat) === null) {
            return null;
        }
        let years = 0, months = 0, days = 0;
        resultNonNull.forEach(([identifier, number]) => {
            if (identifier === 'y') {
                years = number;
            } else if (identifier === 'm') {
                months = number;
            } else {
                days = number;
            }
        });
        return { hasDate: true, date: { years, months, days }, ...common };
    }
};

import {
    ValueDate,
    ValueDateApproximated,
    ValueDateInterpreted,
    ValueDateNormal,
    ValueDatePeriodFrom,
    ValueDatePeriodFull,
    ValueDatePeriodTo,
    ValueDatePhraseOnly,
    ValueDateRangeAfter,
    ValueDateRangeBefore,
    ValueDateRangeFull, ValuePartDateYear, ValuePartDateDay, ValuePartDateMonth,
    ValuePartYear, ValuePartYearDual, ValueDateBase,
} from './dates';
import { ValueExactDate } from './ValueExactDate';

const CALENDAR_GREGORIAN = 'DGREGORIAN', CALENDAR_JULIAN = 'DJULIAN', CALENDAR_HEBREW = 'DHEBREW',
    CALENDAR_FRENCH_REPUBLICAN = 'DFRENCH R', CALENDAR_UNKNOWN = 'DUNKNOWN';

const DATE_PERIOD_FROM = 'FROM', DATE_PERIOD_TO = 'TO';
const DATE_RANGE_BEFORE = 'BEF', DATE_RANGE_AFTER = 'AFT', DATE_RANGE_BETWEEN = 'BET', DATE_RANGE_AND = 'AND';
const DATE_APPROXIMATED_ABOUT = 'ABT', DATE_APPROXIMATED_CALCULATED = 'CAL', DATE_APPROXIMATED_ESTIMATED = 'EST';
const DATE_INT = 'INT';

const createIndices = (array: string[], looseCase = false) => {
    // Start with 1 to preserve the month numbers
    const entries: [string, number][] = array.map((value, i) => [value, i + 1]);
    const capitalizeFirst = (v: string): string => v ? v[0].toUpperCase() + v.substring(1).toLowerCase() : v;
    const finalEntries = looseCase ? entries.concat(entries.map(([value, n]) => [capitalizeFirst(value), n])) : entries;
    return Object.fromEntries(finalEntries);
};

const MONTHS = createIndices(['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'], true); // Old software format months that way, so we allow them
const MONTHS_FRENCH = createIndices(['VEND', 'BRUM', 'FRIM', 'NIVO', 'PLUV', 'VENT', 'GERM', 'FLOR', 'PRAI', 'MESS', 'THER', 'FRUC', 'COMP']);
const MONTHS_HEBREW = createIndices(['TSH', 'CSH', 'KSL', 'TVT', 'SHV', 'ADR', 'ADS', 'NSN', 'IYR', 'SVN', 'TMZ', 'AAV', 'ELL']);

const BEFORE_COMMON_ERA = createIndices(['BCE', 'BC', 'B.C.']);

const rDateCalendarEscape = /^(?:@@#(.*)@@|@#(.*)@)$/; // FIXME
const rDatePhrase = /^\((.*)\)$/;
const rDatePhraseEnd = /\((.*)\)$/;

const gYear = '([1-9][0-9]*|0|00[1-9]|0[1-9][0-9])';
const rYear = new RegExp(`^${gYear}$`);
const rYearDual = new RegExp(`^${gYear}/([0-9]{2})$`);
const rDay = /^(?:0?[1-9]|[1-2][0-9]|3[0-1])$/; // Allow leading zeros

const daysInJulianMonth = (month: number, isBissextile: boolean): number =>
    month === 2 ? 28 + (isBissextile ? 1 : 0) : 30 + ([4, 6, 9, 11].includes(month) ? 0 : 1);

const isValidPartialDateJulian = (isBissextile: boolean, month?: number, day?: number): boolean => {
    if (month != null) {
        if (month < 1 || month > 12) { // This check is redundant, but included for completeness
            return false;
        }
        if (day != null) {
            const daysInMonth = daysInJulianMonth(month, isBissextile);
            if (day < 1 || day > daysInMonth) {
                return false;
            }
        }
    }
    return true;
};

const isValidDateGregorian = (year: number, month?: number, day?: number): boolean => {
    const isBissextile = ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
    return isValidPartialDateJulian(isBissextile, month, day);
};

const isValidDateJulian = (year: number, month: number, day?: number): boolean => {
    const isBissextile = year % 4 === 0;
    return isValidPartialDateJulian(isBissextile, month, day);
};

const isValidDateFrenchRepublican = (year: number, month?: number, day?: number): boolean => {
    if (!(year >= 1 && year <= 14)) {
        return false;
    }
    if (month != null) {
        if (month < 1 || month > 13) {
            return false;
        }
        if (day != null) {
            const isBissextile = year % 4 === 3;
            const daysInMonth = month !== 13 ? 30 : 5 + (isBissextile ? 1 : 0);
            if (day < 1 || day > daysInMonth) {
                return false;
            }
        }
    }
    return true;
};

/**
 * Parses a Gedcom date. These dates can take many different forms, see {@link ValueDate}.
 * @param value The value to parse
 * @category Value parsers
 */
export const parseDate = (value: string | null): ValueDate | null => {
    if (!value) {
        return null;
    }

    value = value.trim(); // Some files contain leading/trailing spaces

    const defaultDateKinds: ValueDateBase = {
        hasDate: true,
        hasPhrase: false,

        isDatePunctual: false,
        isDatePeriod: false,
        isDateRange: false,
        isDateApproximated: false,
        isDateInterpreted: false,
    };

    let textMatch;
    if ((textMatch = rDatePhrase.exec(value)) !== null) {
        const text = textMatch[1];
        return {
            ...defaultDateKinds,
            hasDate: false,
            hasPhrase: true,
            phrase: text,
        } as ValueDatePhraseOnly;
    }

    const parts = [];
    let j = 0;
    const spaceChar = ' ', escapeStart = '@#', escapeEndChar = '@';
    for (let k = 0; k < value.length; k++) {
        if (value.substring(k, k + escapeStart.length) === escapeStart) {
            k += escapeStart.length;
            while (k < value.length && value[k] !== escapeEndChar) {
                k++;
            }
        } else {
            if (value[k] === spaceChar) {
                parts.push(value.substring(j, k));
                j = k + 1;
            }
        }
    }
    parts.push(value.substring(j, value.length));

    let i = 0;

    const parseYearPart = (parts: string[], allowBce: boolean, allowDual: boolean): ValuePartYear | null => {
        const defaultYearModifiers = {
            isBce: false,
            isDual: false,
        };
        let dual;
        if (i < parts.length && rYear.exec(parts[i]) !== null) {
            const value = parseInt(parts[i]);
            i++;
            if (allowBce) {
                let isBce = false;
                if (i < parts.length && BEFORE_COMMON_ERA[parts[i]] !== undefined) {
                    isBce = true;
                    i++;
                }
                return {
                    ...defaultYearModifiers,
                    value,
                    isBce,
                };
            } else {
                return {
                    ...defaultYearModifiers,
                    value,
                };
            }
        } else if (allowDual && i < parts.length && (dual = rYearDual.exec(parts[i])) !== null) {
            const value = parseInt(dual[1]), valueDual = parseInt(dual[2]);
            i++;
            return {
                ...defaultYearModifiers,
                value,
                isDual: true,
                valueDual,
            } as ValuePartYearDual;
        } else {
            return null; // Underflow or not a year
        }
    };

    const parseDatePart = (parts: string[]): ValuePartDateYear | null => {
        if (i < parts.length) {
            let escapeMatch;
            let calendar = CALENDAR_GREGORIAN;
            if ((escapeMatch = rDateCalendarEscape.exec(parts[i])) !== null) { // Starts with a calendar
                calendar = escapeMatch[1] ?? escapeMatch[2];
                i++;
            }
            const isGregorian = calendar === CALENDAR_GREGORIAN, isJulian = calendar === CALENDAR_JULIAN,
                isHebrew = calendar === CALENDAR_HEBREW,
                isFrenchRepublican = calendar === CALENDAR_FRENCH_REPUBLICAN, isUnknown = calendar === CALENDAR_UNKNOWN;
            const isGregorianOrJulian = isGregorian || isJulian;
            const calendarProps = {
                isGregorian, isJulian, isHebrew, isFrenchRepublican, isUnknown,
            };
            let monthsIndices;
            if (isGregorian || isJulian) {
                monthsIndices = MONTHS;
            } else if (isHebrew) {
                monthsIndices = MONTHS_HEBREW;
            } else if (isFrenchRepublican) {
                monthsIndices = MONTHS_FRENCH;
            } else {
                return null; // Unknown/invalid calendar
            }

            let monthIndex;
            if (i < parts.length && (monthIndex = monthsIndices[parts[i]]) !== undefined) { // Format month-year
                i++;
                const year = parseYearPart(parts, false, isGregorianOrJulian);
                if (year !== null) {
                    if ((isGregorian && !isValidDateGregorian(year.value, monthIndex)) ||
                        (isJulian && !isValidDateJulian(year.value, monthIndex)) ||
                        (isFrenchRepublican && !isValidDateFrenchRepublican(year.value, monthIndex))) {
                        return null;
                    }
                    return {
                        calendar: calendarProps,
                        month: monthIndex,
                        year: year,
                    } as ValuePartDateMonth;
                } else {
                    return null; // Invalid year
                }
            } else {
                const previousI = i;
                const firstAsYear = parseYearPart(parts, isGregorianOrJulian, false);
                if (firstAsYear !== null && firstAsYear.isBce) {
                    return {
                        calendar: calendarProps,
                        year: firstAsYear,
                    } as ValuePartDateYear;
                }
                i = previousI; // Important: we need to backtrack since there can be an ambiguity
                const firstAsDay = i < parts.length && rDay.exec(parts[i]) !== null ? parseInt(parts[i]) : null;
                let secondAsMonth = null;
                if (firstAsDay !== null && i + 1 < parts.length) {
                    const month = monthsIndices[parts[i + 1]];
                    if (month !== undefined) {
                        secondAsMonth = month;
                    }
                }
                // Remark that `secondAsMonth !== null` implies `firstAsDay !== null`; but the type checker cannot infer it
                if (firstAsDay !== null && secondAsMonth !== null) { // Format day-month-year
                    i += 2;
                    const year = parseYearPart(parts, false, isGregorianOrJulian);
                    if (year !== null) {
                        if ((isGregorian && !isValidDateGregorian(year.value, secondAsMonth, firstAsDay)) ||
                            (isJulian && !isValidDateJulian(year.value, secondAsMonth, firstAsDay)) ||
                            (isFrenchRepublican && !isValidDateFrenchRepublican(year.value, secondAsMonth, firstAsDay))) {
                            return null;
                        }
                        return {
                            calendar: calendarProps,
                            day: firstAsDay,
                            month: secondAsMonth,
                            year: year,
                        } as ValuePartDateDay;
                    } else {
                        return null; // Invalid year (or the format is day-month, which is not supported here)
                    }
                } else if (firstAsYear !== null) { // Format year
                    i++;
                    if (isFrenchRepublican && !isValidDateFrenchRepublican(firstAsYear.value)) {
                        return null;
                    }
                    return {
                        calendar: calendarProps,
                        year: firstAsYear,
                    } as ValuePartDateYear;
                } else {
                    return null; // Invalid year (or first token)
                }
            }
        } else {
            return null; // Underflow
        }
    };

    i++;

    if (parts.length === 0) {
        return null; // Underflow
    } else if (parts[0] === DATE_PERIOD_FROM) {
        const date = parseDatePart(parts);
        if (date !== null) {
            if (i === parts.length) { // Only from
                return {
                    ...defaultDateKinds,
                    isDatePeriod: true,
                    dateFrom: date,
                } as ValueDatePeriodFrom;
            }
            if (i < parts.length && parts[i] === DATE_PERIOD_TO) {
                i++;
                const date2 = parseDatePart(parts);
                if (date2 !== null && i === parts.length) { // Only from
                    return {
                        ...defaultDateKinds,
                        isDatePeriod: true,
                        dateFrom: date,
                        dateTo: date2,
                    } as ValueDatePeriodFull;
                }
            }
        }
    } else if (parts[0] === DATE_PERIOD_TO) {
        const date = parseDatePart(parts);
        if (date !== null && i === parts.length) {
            return {
                ...defaultDateKinds,
                isDatePeriod: true,
                dateTo: date,
            } as ValueDatePeriodTo;
        }
    } else if (parts[0] === DATE_RANGE_BEFORE) {
        const date = parseDatePart(parts);
        if (date !== null && i === parts.length) {
            return {
                ...defaultDateKinds,
                isDateRange: true,
                dateBefore: date,
            } as ValueDateRangeBefore;
        }
    } else if (parts[0] === DATE_RANGE_AFTER) {
        const date = parseDatePart(parts);
        if (date !== null && i === parts.length) {
            return {
                ...defaultDateKinds,
                isDateRange: true,
                dateAfter: date,
            } as ValueDateRangeAfter;
        }
    } else if (parts[0] === DATE_RANGE_BETWEEN) {
        const date1 = parseDatePart(parts);
        if (date1 !== null) {
            if (parts[i] === DATE_RANGE_AND) {
                i++;
                const date2 = parseDatePart(parts);
                if (date2 !== null && i === parts.length) {
                    return {
                        ...defaultDateKinds,
                        isDateRange: true,
                        dateAfter: date1,
                        dateBefore: date2,
                    } as ValueDateRangeFull;
                }
            }
        }
    } else if (parts[0] === DATE_APPROXIMATED_ABOUT || parts[0] === DATE_APPROXIMATED_CALCULATED || parts[0] === DATE_APPROXIMATED_ESTIMATED) {
        const date = parseDatePart(parts);
        if (date !== null && i === parts.length) {
            return {
                ...defaultDateKinds,
                isDatePunctual: true,
                isDateApproximated: true,
                approximationKind: {
                    isAbout: parts[0] === DATE_APPROXIMATED_ABOUT,
                    isCalculated: parts[0] === DATE_APPROXIMATED_CALCULATED,
                    isEstimated: parts[0] === DATE_APPROXIMATED_ESTIMATED,
                },
                date,
            } as ValueDateApproximated;
        }
    } else if (parts[0] === DATE_INT) {
        const date = parseDatePart(parts);
        if (date !== null) {
            const phraseEnd = rDatePhraseEnd.exec(value);
            if (phraseEnd !== null) {
                const text = phraseEnd[1];
                return {
                    ...defaultDateKinds,
                    hasPhrase: true,
                    isDatePunctual: true,
                    isDateInterpreted: true,
                    date,
                    phrase: text,
                } as ValueDateInterpreted;
            }
        }
    } else { // Normal date
        i--;
        const date = parseDatePart(parts);
        if (date !== null && i === parts.length) {
            return {
                ...defaultDateKinds,
                isDatePunctual: true,
                date,
            } as ValueDateNormal;
        }
    }
    return null; // All other invalid cases
};

/**
 * @param value
 * @category Value parsers
 */
export const parseExactDate = (value: string | null): ValueExactDate | null => {
    if (!value) {
        return null;
    }

    value = value.trim();

    const parts = value.split(' ');

    if (parts.length !== 3) { // Must contain three parts: day, month, year
        return null;
    }

    const month = MONTHS[parts[1]];
    if (rDay.exec(parts[0]) !== null && month !== undefined && rYear.exec(parts[2]) !== null) {
        const day = parseInt(parts[0]);
        const year = parseInt(parts[2]);
        return {
            day,
            month,
            year,
        };
    } else { // Invalid date
        return null;
    }
};

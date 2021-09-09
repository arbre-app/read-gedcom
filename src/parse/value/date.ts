import { GedcomDate } from './GedcomDate';

const CALENDAR_GREGORIAN = 'DGREGORIAN', CALENDAR_JULIAN = 'DJULIAN', CALENDAR_HEBREW = 'DHEBREW',
    CALENDAR_FRENCH_REPUBLICAN = 'DFRENCH R', CALENDAR_UNKNOWN = 'DUNKNOWN';

const DATE_PERIOD_FROM = 'FROM', DATE_PERIOD_TO = 'TO';
const DATE_RANGE_BEFORE = 'BEF', DATE_RANGE_AFTER = 'AFT', DATE_RANGE_BETWEEN = 'BET', DATE_RANGE_AND = 'AND';
const DATE_APPROXIMATED_ABOUT = 'ABT', DATE_APPROXIMATED_CALCULATED = 'CAL', DATE_APPROXIMATED_ESTIMATED = 'EST';
const DATE_INT = 'INT';

const createIndices = (array: string[]) => {
    // Start with 1 to preserve the month numbers
    return Object.fromEntries(array.map((value, i) => [value, i + 1]));
};

const MONTHS = createIndices(['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']);
const MONTHS_FRENCH = createIndices(['VEND', 'BRUM', 'FRIM', 'NIVO', 'PLUV', 'VENT', 'GERM', 'FLOR', 'PRAI', 'MESS', 'THER', 'FRUC', 'COMP']);
const MONTHS_HEBREW = createIndices(['TSH', 'CSH', 'KSL', 'TVT', 'SHV', 'ADR', 'ADS', 'NSN', 'IYR', 'SVN', 'TMZ', 'AAV', 'ELL']);

const BEFORE_COMMON_ERA = createIndices(['BCE', 'BC', 'B.C.']);

const rDateCalendarEscape = /^@@#(.*)@@|@#(.*)@$/; // FIXME
const rDatePhrase = /^\\((.*)\\)$/;
const rDatePhraseEnd = /\((.*)\)$/;

const strYear = '[1-9][0-9]*|0|00[1-9]|0[1-9][0-9]';
const rYear = new RegExp(`^${strYear}$`);
const rYearDual = new RegExp(`^(${strYear})/([0-9]{2})$`);
const rDay = /^[1-2]?[0-9]|3[0-1]$/;

export const parseDate = (value: string | null):
    (GedcomDate.Fuzzy.Normal | GedcomDate.Fuzzy.Approximated
        | GedcomDate.Fuzzy.PeriodFrom | GedcomDate.Fuzzy.PeriodTo | GedcomDate.Fuzzy.PeriodFull
        | GedcomDate.Fuzzy.RangeAfter | GedcomDate.Fuzzy.RangeBefore | GedcomDate.Fuzzy.RangeFull
        | GedcomDate.Fuzzy.Interpreted | GedcomDate.Fuzzy.PhraseOnly) | null => {
    if (!value) {
        return null;
    }

    value = value.trim(); // Some files contain leading/trailing spaces

    const defaultDateKinds: GedcomDate.Fuzzy = {
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
        } as GedcomDate.Fuzzy.PhraseOnly;
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

    const parseYearPart = (parts: string[], allowBce: boolean, allowDual: boolean): GedcomDate.FuzzyPart.Year | null => {
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
            } as GedcomDate.FuzzyPart.YearDual;
        } else {
            return null; // Underflow or not a year
        }
    };

    const parseDatePart = (parts: string[]): GedcomDate.FuzzyPart.Date | null => {
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
                    return {
                        calendar: calendarProps,
                        month: monthIndex,
                        year: year,
                    } as GedcomDate.FuzzyPart.DateMonth;
                } else {
                    return null; // Invalid year
                }
            } else {
                const firstAsYear = parseYearPart(parts, isGregorianOrJulian, false);
                if (firstAsYear !== null && firstAsYear.isBce) {
                    return {
                        calendar: calendarProps,
                        year: firstAsYear,
                    } as GedcomDate.FuzzyPart.Date;
                }
                i--; // Guaranteed that we only read one token
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
                        return {
                            calendar: calendarProps,
                            day: firstAsDay,
                            month: secondAsMonth,
                            year: year,
                        } as GedcomDate.FuzzyPart.DateDay;
                    } else {
                        return null; // Invalid year (or the format is day-month, which is not supported here)
                    }
                } else if (firstAsYear !== null) { // Format year
                    i++;
                    return {
                        calendar: calendarProps,
                        year: firstAsYear,
                    };
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
                } as GedcomDate.Fuzzy.PeriodFrom;
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
                    } as GedcomDate.Fuzzy.PeriodFull;
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
            } as GedcomDate.Fuzzy.PeriodTo;
        }
    } else if (parts[0] === DATE_RANGE_BEFORE) {
        const date = parseDatePart(parts);
        if (date !== null && i === parts.length) {
            return {
                ...defaultDateKinds,
                isDateRange: true,
                dateBefore: date,
            } as GedcomDate.Fuzzy.RangeBefore;
        }
    } else if (parts[0] === DATE_RANGE_AFTER) {
        const date = parseDatePart(parts);
        if (date !== null && i === parts.length) {
            return {
                ...defaultDateKinds,
                isDateRange: true,
                dateAfter: date,
            } as GedcomDate.Fuzzy.RangeAfter;
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
                    } as GedcomDate.Fuzzy.RangeFull;
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
            } as GedcomDate.Fuzzy.Approximated;
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
                } as GedcomDate.Fuzzy.Interpreted;
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
            } as GedcomDate.Fuzzy.Normal;
        }
    }
    return null; // All other invalid cases
};

export const parseExactDate = (value: string | null): GedcomDate.Exact | null => {
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

export const parseExactTime = (value: string | null): GedcomDate.ExactTime | null => {
    // Note: Gedcom 5.5.5 says *no* leading zeros are allowed on hours. For compatibility purposes we *do* accept them anyway
    const rTime = /^(0?[0-9]|1[0-9]|2[0-3]):([0-5][0-9])(?::([0-5][0-9])(?:\.([0-9]{2}))?)?$/;

    if (!value) {
        return null;
    }
    const groups = rTime.exec(value);
    if (!groups) {
        return null;
    }
    const hours = parseInt(groups[1]);
    const minutes = parseInt(groups[2]);
    const hoursMinutes = {
        hours,
        minutes,
    };
    if (groups[3] !== undefined) {
        const seconds = parseInt(groups[3]);
        const hoursMinutesSeconds = {
            ...hoursMinutes,
            seconds,
        };
        if (groups[4] !== undefined) {
            const centiseconds = parseInt(groups[4]);
            return {
                ...hoursMinutesSeconds,
                centiseconds,
            };
        } else {
            return hoursMinutesSeconds;
        }
    } else {
        return hoursMinutes;
    }
};

const CALENDAR_GREGORIAN = 'DGREGORIAN', CALENDAR_JULIAN = 'DJULIAN', CALENDAR_HEBREW = 'DHEBREW',
    CALENDAR_FRENCH_REPUBLICAN = 'DFRENCH R', CALENDAR_UNKNOWN = 'DUNKNOWN';

const DATE_PERIOD_FROM = 'FROM', DATE_PERIOD_TO = 'TO';
const DATE_RANGE_BEFORE = 'BEF', DATE_RANGE_AFTER = 'AFT', DATE_RANGE_BETWEEN = 'BET', DATE_RANGE_AND = 'AND';
const DATE_APPROXIMATED_ABOUT = 'ABT', DATE_APPROXIMATED_CALCULATED = 'CAL', DATE_APPROXIMATED_ESTIMATED = 'EST';
const DATE_INT = 'INT';

function createIndices(array) {
    const object = {};
    let i = 1; // Start with 1 to preserve the month numbers
    for (const key of array) {
        object[key] = i++;
    }
    return object;
}

const MONTHS = createIndices(['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']);
const MONTHS_FRENCH = createIndices(['VEND', 'BRUM', 'FRIM', 'NIVO', 'PLUV', 'VENT', 'GERM', 'FLOR', 'PRAI', 'MESS', 'THER', 'FRUC', 'COMP']);
const MONTHS_HEBREW = createIndices(['TSH', 'CSH', 'KSL', 'TVT', 'SHV', 'ADR', 'ADS', 'NSN', 'IYR', 'SVN', 'TMZ', 'AAV', 'ELL']);

const BEFORE_COMMON_ERA = createIndices(['BCE', 'BC', 'B.C.']);

const rDateCalendarEscape = /^@#(.*)@$/;
const rDatePhrase = /^\\((.*)\\)$/;
const rDatePhraseEnd = /\((.*)\)$/;

const strYear = '[1-9][0-9]*|0|00[1-9]|0[1-9][0-9]';
const rYear = new RegExp(`^${strYear}$`);
const rYearDual = new RegExp(`^(${strYear})/([0-9]{2})$`);
const rDay = /^[1-2]?[0-9]|3[0-1]$/;


export function parseDate(value) {
    if (!value) {
        return null;
    }

    const defaultDateKinds = {
        hasDate: true,
        hasPhrase: false,

        isDatePunctual: false,
        isDatePeriod: false,
        isDateRange: false,
        isDateApproximate: false,
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
        };
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

    function parseYearPart(parts, allowBce, allowDual) {
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
                    value,
                    isBce,
                };
            } else if (allowDual) {
                return {
                    value,
                    isDual: false,
                };
            } else {
                return {
                    value,
                };
            }
        } else if (allowDual && i < parts.length && (dual = rYearDual.exec(parts[i])) !== null) {
            const value = parseInt(dual[1]), valueDual = parseInt(dual[2]);
            i++;
            return {
                value,
                isDual: true,
                valueDual,
            };
        } else {
            return null; // Underflow or not a year
        }
    }

    function parseDatePart(parts) {
        if (i < parts.length) {
            let escapeMatch;
            let calendar = CALENDAR_GREGORIAN;
            if ((escapeMatch = rDateCalendarEscape.exec(parts[i])) !== null) { // Starts with a calendar
                calendar = escapeMatch[1];
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
                    };
                } else {
                    return null; // Invalid year
                }
            } else {
                const firstAsYear = parseYearPart(parts, isGregorianOrJulian, false);
                if (firstAsYear !== null && firstAsYear.isBce) {
                    return {
                        calendar: calendarProps,
                        year: firstAsYear,
                    };
                }
                i--; // Guaranteed that we only read one token
                const firstAsDay = i < parts.length && rDay.exec(parts[i]) !== undefined ? parseInt(parts[i]) : null;
                let secondAsMonth = null;
                if (firstAsDay !== null && i + 1 < parts.length) {
                    const month = monthsIndices[parts[i + 1]];
                    if (month !== undefined) {
                        secondAsMonth = month;
                    }
                }
                if (secondAsMonth !== null) { // Format day-month-year
                    i += 2;
                    const year = parseYearPart(parts, false, isGregorianOrJulian);
                    if (year !== null) {
                        return {
                            calendar: calendarProps,
                            day: firstAsDay,
                            month: secondAsMonth,
                            year: year,
                        };
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
    }

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
                };
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
                    };
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
            };
        }
    } else if (parts[0] === DATE_RANGE_BEFORE) {
        const date = parseDatePart(parts);
        if (date !== null && i === parts.length) {
            return {
                ...defaultDateKinds,
                isDateRange: true,
                dateBefore: date,
            };
        }
    } else if (parts[0] === DATE_RANGE_AFTER) {
        const date = parseDatePart(parts);
        if (date !== null && i === parts.length) {
            return {
                ...defaultDateKinds,
                isDateRange: true,
                dateAfter: date,
            };
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
                    };
                }
            }
        }
    } else if (parts[0] === DATE_APPROXIMATED_ABOUT || parts[0] === DATE_APPROXIMATED_CALCULATED || parts[0] === DATE_APPROXIMATED_ESTIMATED) {
        const date = parseDatePart(parts);
        if (date !== null && i === parts.length) {
            return {
                ...defaultDateKinds,
                isDatePunctual: true,
                isDateApproximate: true,
                approximationKind: {
                    isAbout: parts[0] === DATE_APPROXIMATED_ABOUT,
                    isCalculated: parts[0] === DATE_APPROXIMATED_CALCULATED,
                    isEstimated: parts[0] === DATE_APPROXIMATED_ESTIMATED,
                },
                date,
            };
        }
    } else if (parts[0] === DATE_INT) {
        const date = parseDatePart(parts);
        if (date !== null) {
            const phraseEnd = rDatePhraseEnd.exec(value);
            if (phraseEnd !== undefined) {
                const text = phraseEnd[1];
                return {
                    ...defaultDateKinds,
                    hasPhrase: true,
                    isDatePunctual: true,
                    isDateInterpreted: true,
                    date,
                    phrase: text,
                };
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
            };
        }
    }
    return null; // All other invalid cases
}

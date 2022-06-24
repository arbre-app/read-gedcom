export interface ValuePartYearBase {
    value: number;
    isBce: boolean;
    isDual: boolean;
}

export interface ValuePartYearNormal extends ValuePartYearBase {
    isDual: false;
}

export interface ValuePartYearDual extends ValuePartYearBase {
    isDual: true;
    valueDual: number;
}

/**
 * Stores information about the year.
 * Note that the field {@link value} is always a positive integer; if the date is
 * BCE then it is indicated by {@link isBce}. The year can also be "dual": although uncommon
 * in practice, this means that there is an ambiguity between two years. In that case the second
 * year is expressed as a two-digit number and stored in {@link valueDual}.
 */
export type ValuePartYear = ValuePartYearNormal | ValuePartYearDual;

export interface ValuePartCalendar {
    isGregorian: boolean;
    isJulian: boolean;
    isHebrew: boolean;
    isFrenchRepublican: boolean;
    isUnknown: boolean;
}

export interface ValuePartDateYear {
    calendar: ValuePartCalendar;
    year: ValuePartYear;
}

export interface ValuePartDateMonth extends ValuePartDateYear {
    month: number;
    // `year` type could be refined (no BCE)
}

export interface ValuePartDateDay extends ValuePartDateMonth {
    day: number;
}

/**
 * Represents a known date or partially known date expressed in a certain calendar.
 * It is guaranteed that the fields {@link calendar} and {@link year} are defined.
 * Note that the year is not a value but an object, because it contains more information (see {@link ValuePartYear}).
 * If defined, both the month and the day start at value 1.
 */
export type ValuePartDate = ValuePartDateYear | ValuePartDateMonth | ValuePartDateDay;

/**
 * The base type for all date values.
 */
export interface ValueDateBase {
    /**
     * Indicates an instance of {@link ValueDateDated}.
     */
    hasDate: boolean;
    /**
     * Indicates an instance of {@link ValueDatePhrased}.
     */
    hasPhrase: boolean;

    /**
     * Indicates an instance of {@link ValueDatePunctual}. Implies {@link hasDate}.
     */
    isDatePunctual: boolean;
    /**
     * Indicates an instance of {@link ValueDatePeriod}. Implies {@link hasDate}.
     */
    isDatePeriod: boolean;
    /**
     * Indicates an instance of {@link ValueDateRange}. Implies {@link hasDate}.
     */
    isDateRange: boolean;
    /**
     * Indicates an instance of {@link ValueDateApproximated}. Implies {@link hasDate}.
     */
    isDateApproximated: boolean;
    /**
     * Indicates an instance of {@link ValueDateInterpreted}. Implies {@link hasDate}.
     */
    isDateInterpreted: boolean;
}

/**
 * An instance is indicated by {@link hasPhrase}.
 */
export interface ValueDatePhrased extends ValueDateBase {
    hasPhrase: true;
    phrase: string;

    isDatePeriod: false;
    isDateRange: false;
    isDateApproximated: false;
}

/**
 * An instance is indicated by the conjunction of {@link hasPhrase} and negated {@link hasDate} (or equivalently, {@link hasPhrase} and negated {@link isDateInterpreted}).
 */
export interface ValueDatePhraseOnly extends ValueDatePhrased {
    hasDate: false;
    isDatePunctual: false;
    isDateApproximated: false;
    isDateInterpreted: false;
}

/**
 * An instance is indicated by {@link hasDate}.
 */
export interface ValueDateDated extends ValueDateBase {
    hasDate: true;
}

/**
 * An instance is indicated by {@link isDatePunctual}.
 */
export interface ValueDatePunctual extends ValueDateDated {
    isDatePunctual: true;
    date: ValuePartDate;

    isDatePeriod: false;
    isDateRange: false;
}

/**
 * An instance is indicated by {@link isDateApproximated}.
 */
export interface ValueDateApproximated extends ValueDatePunctual {
    isDateApproximated: true;
    approximationKind: {
        isAbout: boolean,
        isCalculated: boolean,
        isEstimated: boolean,
    };

    hasPhrase: false;
    isDateInterpreted: false;
}

/**
 * An instance is indicated by {@link isDateInterpreted} (or equivalently by the conjunction of {@link isDatePunctual} and {@link hasPhrase}).
 */
export interface ValueDateInterpreted extends ValueDatePunctual, ValueDatePhrased {
    // For some reason the compiler requires us to redefine these three attributes
    hasDate: true;
    isDatePunctual: true;
    hasPhrase: true;

    isDateInterpreted: true;

    isDateApproximated: false; // Also required by the compiler
}

/**
 * An instance is indicated by the conjunction of {@link isDatePunctual}, negated {@link isDateApproximated} and negated {@link isDateInterpreted}.
 */
export interface ValueDateNormal extends ValueDatePunctual {
    hasPhrase: false;
    isDateApproximated: false;
    isDateInterpreted: false;
}

/**
 * An instance is indicated by {@link isDateRange}.
 */
export interface ValueDateRange extends ValueDateDated {
    isDateRange: true;

    hasPhrase: false;
    isDatePunctual: false;
    isDatePeriod: false;
    isDateApproximated: false;
    isDateInterpreted: false;
}

/**
 * An instance is indicated by {@link isDateRange} and defined {@link dateAfter}.
 */
export interface ValueDateRangeAfter extends ValueDateRange {
    dateAfter: ValuePartDate;
}

/**
 * An instance is indicated by {@link isDateRange} and defined {@link dateBefore}.
 */
export interface ValueDateRangeBefore extends ValueDateRange {
    dateBefore: ValuePartDate;
}

/**
 * An instance is indicated by {@link isDateRange}, defined {@link dateAfter} and defined {@link dateBefore}.
 */
export interface ValueDateRangeFull extends ValueDateRangeAfter, ValueDateRangeBefore {}

/**
 * An instance is indicated by {@link isDatePeriod}.
 */
export interface ValueDatePeriod extends ValueDateDated {
    isDatePeriod: true;

    hasPhrase: false;
    isDatePunctual: false;
    isDateRange: false;
    isDateApproximated: false;
    isDateInterpreted: false;
}

/**
 * An instance is indicated by {@link isDatePeriod} and defined {@link dateFrom}.
 */
export interface ValueDatePeriodFrom extends ValueDatePeriod {
    dateFrom: ValuePartDate;
}

/**
 * An instance is indicated by {@link isDatePeriod} and defined {@link dateTo}.
 */
export interface ValueDatePeriodTo extends ValueDatePeriod {
    dateTo: ValuePartDate;
}

/**
 * An instance is indicated by {@link isDatePeriod}, defined {@link dateFrom} and defined {@link dateTo}.
 */
export interface ValueDatePeriodFull extends ValueDatePeriodFrom, ValueDatePeriodTo {}

/**
 * A valid Gedcom date. See {@link ValueDateBase}, the base type for all of them.
 */
export type ValueDate = ValueDateNormal | ValueDateApproximated
    | ValueDatePeriodFrom | ValueDatePeriodTo | ValueDatePeriodFull
    | ValueDateRangeAfter | ValueDateRangeBefore | ValueDateRangeFull
    | ValueDateInterpreted | ValueDatePhraseOnly;

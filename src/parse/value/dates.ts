export interface ValuePartYear {
    value: number;
    isBce: boolean;
    isDual: boolean;
}

export interface ValuePartYearDual extends ValuePartYear {
    isDual: true;
    valueDual: number;
}

export interface ValuePartCalendar {
    isGregorian: boolean;
    isJulian: boolean;
    isHebrew: boolean;
    isFrenchRepublican: boolean;
    isUnknown: boolean;
}

export interface ValuePartDate {
    calendar: ValuePartCalendar;
    year: ValuePartYear;
}

export interface ValuePartDateMonth extends ValuePartDate {
    month: number;
}

export interface ValuePartDateDay extends ValuePartDateMonth {
    day: number;
}

export interface ValueDate {
    /**
     * Indicates an instance of {@link ValueDateDated}.
     */
    hasDate: boolean;
    /**
     * Indicates an instance of {@link ValueDatePhrased}.
     */
    hasPhrase: boolean;

    /**
     * Indicates an instance of {@link ValueDatePunctual}.
     */
    isDatePunctual: boolean;
    /**
     * Indicates an instance of {@link ValueDatePeriod}.
     */
    isDatePeriod: boolean;
    /**
     * Indicates an instance of {@link ValueDateRange}.
     */
    isDateRange: boolean;
    /**
     * Indicates an instance of {@link ValueDateApproximated}.
     */
    isDateApproximated: boolean;
    /**
     * Indicates an instance of {@link ValueDateInterpreted}.
     */
    isDateInterpreted: boolean;
}

/**
 * An instance is indicated by {@link hasPhrase}.
 */
export interface ValueDatePhrased extends ValueDate {
    hasPhrase: true;
    phrase: string;
}

export type ValueDatePhraseOnly = ValueDatePhrased; // FIXME?

/**
 * An instance is indicated by {@link hasDate}.
 */
export interface ValueDateDated extends ValueDate {
    hasDate: true;
}

/**
 * An instance is indicated by {@link isDatePunctual}.
 */
export interface ValueDatePunctual extends ValueDateDated {
    isDatePunctual: true;
    date: ValuePartDate;
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
}

export type ValueDateNormal = ValueDatePunctual;

/**
 * An instance is indicated by {@link isDateRange}.
 */
export interface ValueDateRange extends ValueDateDated {
    isDateRange: true;
}

export interface ValueDateRangeAfter extends ValueDateRange {
    dateAfter: ValuePartDate;
}

export interface ValueDateRangeBefore extends ValueDateRange {
    dateBefore: ValuePartDate;
}

export interface ValueDateRangeFull extends ValueDateRangeAfter, ValueDateRangeBefore {}

/**
 * An instance is indicated by {@link isDatePeriod}.
 */
export interface ValueDatePeriod extends ValueDateDated {
    isDatePeriod: true;
}

export interface ValueDatePeriodFrom extends ValueDatePeriod {
    dateFrom: ValuePartDate;
}

export interface ValueDatePeriodTo extends ValueDatePeriod {
    dateTo: ValuePartDate;
}

export interface ValueDatePeriodFull extends ValueDatePeriodFrom, ValueDatePeriodTo {}

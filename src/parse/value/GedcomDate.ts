export namespace GedcomDate {
    export interface Exact {
        day: number;
        month: number;
        year: number;
    }

    export interface Fuzzy {
        /**
         * Indicates an instance of {@link Dated}.
         */
        hasDate: boolean;
        /**
         * Indicates an instance of {@link Phrased}.
         */
        hasPhrase: boolean;

        /**
         * Indicates an instance of {@link Punctual}.
         */
        isDatePunctual: boolean;
        /**
         * Indicates an instance of {@link Period}.
         */
        isDatePeriod: boolean;
        /**
         * Indicates an instance of {@link Range}.
         */
        isDateRange: boolean;
        /**
         * Indicates an instance of {@link Approximated}.
         */
        isDateApproximated: boolean;
        /**
         * Indicates an instance of {@link Interpreted}.
         */
        isDateInterpreted: boolean;
    }

    export namespace FuzzyPart {
        export interface Year {
            value: number;
            isBce: boolean;
            isDual: boolean;
        }

        export interface YearDual extends Year {
            isDual: true;
            valueDual: number;
        }

        export interface Calendar {
            isGregorian: boolean;
            isJulian: boolean;
            isHebrew: boolean;
            isFrenchRepublican: boolean;
            isUnknown: boolean;
        }

        export interface Date {
            calendar: Calendar;
            year: Year;
        }

        export interface DateMonth extends Date {
            month: number;
        }

        export interface DateDay extends DateMonth {
            day: number;
        }
    }

    export namespace Fuzzy {
        /**
         * An instance is indicated by {@link hasPhrase}.
         */
        export interface Phrased extends Fuzzy {
            hasPhrase: true;
            phrase: string;
        }

        export interface PhraseOnly extends Fuzzy {}

        /**
         * An instance is indicated by {@link hasDate}.
         */
        export interface Dated extends Fuzzy {
            hasDate: true;
        }

        /**
         * An instance is indicated by {@link isDatePunctual}.
         */
        export interface Punctual extends Dated {
            isDatePunctual: true;
            date: FuzzyPart.Date;
        }

        /**
         * An instance is indicated by {@link isDateApproximated}.
         */
        export interface Approximated extends Punctual {
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
        export interface Interpreted extends Punctual, Phrased {
            // For some reason the compiler requires us to redefine these three attributes
            hasDate: true;
            isDatePunctual: true;
            hasPhrase: true;

            isDateInterpreted: true;
        }

        export interface Normal extends Punctual {}

        /**
         * An instance is indicated by {@link isDateRange}.
         */
        export interface Range extends Dated {
            isDateRange: true;
        }

        export interface RangeAfter extends Range {
            dateAfter: FuzzyPart.Date;
        }

        export interface RangeBefore extends Range {
            dateBefore: FuzzyPart.Date;
        }

        export interface RangeFull extends RangeAfter, RangeBefore {}

        /**
         * An instance is indicated by {@link isDatePeriod}.
         */
        export interface Period extends Dated {
            isDatePeriod: true;
        }

        export interface PeriodFrom extends Period {
            dateFrom: FuzzyPart.Date;
        }

        export interface PeriodTo extends Period {
            dateTo: FuzzyPart.Date;
        }

        export interface PeriodFull extends PeriodFrom, PeriodTo {}
    }
}

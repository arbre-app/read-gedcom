export interface ValueAge {
    isGreaterThan: boolean,
    isLessThan: boolean,
    hasDate: boolean,
    date?: {
        years: number,
        months: number,
        days: number,
    },
    isChild: boolean,
    isInfant: boolean,
    isStillborn: boolean
}

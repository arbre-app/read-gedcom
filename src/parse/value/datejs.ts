import { GedcomDate } from './GedcomDate';

export const toJsDate = (date: GedcomDate.FuzzyPart.Date): Date | null => {
    const day = (date as GedcomDate.FuzzyPart.DateDay).day ?? 1; // Dirty; if you find a better way to do it, submit PR
    const month = (date as GedcomDate.FuzzyPart.DateMonth).month ?? 1;
    const year = date.year.isBce ? -date.year.value : date.year.value;

    if(date.year.isDual) {
        return null; // Dual years are unsupported (and rarely ever used anyway)
    }

    if(date.calendar.isGregorian) {
        return new Date(Date.UTC(year, month - 1, day)); // All dates are UTC
    } else if(date.calendar.isFrenchRepublican) {
        // We only support dates during which the calendar was in use
        if(!(year >= 1 && year <= 14)) {
            return null;
        }
        const startYear = 1791;
        const isB = year % 4 === 0;

        const indices = [21, 21, 20, 20, 19, 18, 20, 19, 19, 18, 18, 17, 16];
        const [sYear, sMonth, sDay] = [8, 7, 1];
        const index = indices[month - 1] +
            (month < 7 && isB ? 1 : 0) +
            (year > sYear || (year === sYear && (month > sMonth || (month === sMonth && day >= sDay))) ? 1 : 0);
        return new Date(Date.UTC(startYear + year + (month > 4 ? 1 : 0), ((month - 1) + 8) % 12, day + index));
    } else {
        return null; // Unsupported calendar kind
    }
};

export const toJsDateTime = (date: GedcomDate.Exact, time?: GedcomDate.ExactTime): Date | null => {
    // TODO check valid date
    const dt = new Date(Date.UTC(date.year, date.month - 1, date.day));
    if(time != null) {
        dt.setUTCHours(time.hours); // Important to remain in UTC
        dt.setUTCMinutes(time.minutes);
        if(time.seconds !== undefined) {
            dt.setUTCSeconds(time.seconds);
            if(time.centiseconds !== undefined) {
                dt.setUTCMilliseconds(time.centiseconds * 10);
            }
        }
    }
    return dt;
};

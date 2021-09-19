import { ValuePartDateYear, ValuePartDateDay, ValuePartDateMonth } from './dates';
import { ValueExactDate } from './ValueExactDate';
import { ValueExactTime } from './ValueExactTime';

/**
 * Convert a Julian day number (JDN) into its corresponding JS date.
 * @param jdn The Julian day number
 */
const julianDayNumberToJsDate = (jdn: number): Date => {
    // Conversion of a Julian day number to a Gregorian date
    const j = jdn + 32044;
    const cst1 = 146097;
    const g = Math.floor(j / cst1);
    const dg = j % cst1;
    const cst2 = 36524;
    const c = Math.floor((Math.floor(dg / cst2) + 1) * 3 / 4);
    const dc = dg - c * cst2;
    const cst3 = 1461;
    const b = Math.floor(dc / cst3);
    const db = dc % cst3;
    const cst4 = 365;
    const a = Math.floor((Math.floor(db / cst4) + 1) * 3 / 4);
    const da = db - a * cst4;
    const y = g * 400 + c * 100 + b * 4 + a;
    const cst5 = 153;
    const m = Math.floor((da * 5 + 308) / cst5) - 2;
    const d = da - Math.floor((m + 4) * cst5 / 5) + 122;
    const cst6 = 12;
    const gYear = y - 4800 + Math.floor((m + 2) / cst6);
    const gMonth = (m + 2) % cst6; // Starts at 0!
    const gDay = d + 1;
    return new Date(Date.UTC(gYear, gMonth, gDay));
};

/**
 * Converts a parsed Gedcom date to its corresponding JS date (expressed in the Gregorian calendar).
 * The supported calendars are: Gregorian, Julian and French Republican.
 * The Hebrew calendar is not yet supported. Unknown calendars are inherently unsupported.
 * Dual dates will not be converted.
 * In any of these cases the returned value will be <code>null</code>.
 * The argument is assumed to be correct, that is of correct format and valid date.
 * This is already guaranteed by {@link parseDate}.
 * @param date The parsed date to convert
 * @category Parsed value converters
 */
export const toJsDate = (date: ValuePartDateYear): Date | null => {
    const day = (date as ValuePartDateDay).day ?? 1; // Dirty; if you find a better way to do it, submit PR
    const month = (date as ValuePartDateMonth).month ?? 1;
    const year = date.year.isBce ? -date.year.value : date.year.value; // We consider the existence of year 0

    if (date.year.isDual) {
        return null; // Dual years are unsupported (and rarely ever used anyway)
    }

    if (date.calendar.isGregorian) {
        return new Date(Date.UTC(year, month - 1, day)); // All dates are UTC
    } else if (date.calendar.isFrenchRepublican) {
        // We only support dates during which the calendar was in use; i.e. 1<=year<=14
        const startYear = 1791;
        const isB = year % 4 === 0;

        const indices = [21, 21, 20, 20, 19, 18, 20, 19, 19, 18, 18, 17, 16];
        const [sYear, sMonth, sDay] = [8, 7, 1];
        const index = indices[month - 1] +
            (month < 7 && isB ? 1 : 0) +
            (year > sYear || (year === sYear && (month > sMonth || (month === sMonth && day >= sDay))) ? 1 : 0);
        return new Date(Date.UTC(startYear + year + (month > 4 ? 1 : 0), ((month - 1) + 8) % 12, day + index));
    } else if (date.calendar.isJulian) {
        // https://en.wikipedia.org/wiki/Julian_day#Converting_Julian_calendar_date_to_Julian_Day_Number
        // Compute the Julian day number (JDN) (this is NOT the modified Julian day number (MJD))
        // Only positive values are guaranteed to be valid (i.e. J. years >= -4712)
        const isNormal = month > 2;
        const y = year - (isNormal ? 0 : 1);
        const m = month + (isNormal ? 0 : 12);
        const jdn = Math.floor((1461 * y + 6884472) / 4) + Math.floor((153 * m - 457) / 5) + day - 1;
        return julianDayNumberToJsDate(jdn);
    } else if (date.calendar.isHebrew) {
        return null;
    } else {
        return null; // Unsupported calendar kind
    }
};

/**
 * Converts a parsed Gedcom date and optional time into the corresponding JS datetime.
 * @param date The parsed date
 * @param time And optional parsed time
 * @category Parsed value converters
 */
export const toJsDateTime = (date: ValueExactDate, time?: ValueExactTime): Date | null => {
    const dt = new Date(Date.UTC(date.year, date.month - 1, date.day));
    if (time != null) {
        dt.setUTCHours(time.hours); // Important to remain in UTC
        dt.setUTCMinutes(time.minutes);
        if (time.seconds !== undefined) {
            dt.setUTCSeconds(time.seconds);
            if (time.centiseconds !== undefined) {
                dt.setUTCMilliseconds(time.centiseconds * 10);
            }
        }
    }
    return dt;
};

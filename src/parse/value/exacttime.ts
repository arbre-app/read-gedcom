import { ValueExactTime } from './ValueExactTime';

/**
 * @param value
 * @category Value parsers
 */
export const parseExactTime = (value: string | null): ValueExactTime | null => {
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

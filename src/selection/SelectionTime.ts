import { SelectionAny } from './Selection';

// Note: Gedcom 5.5.5 says *no* leading zeros are allowed on hours. For compatibility purposes we *do* accept them anyway
const rNameParts = /^(0?[0-9]|1[0-9]|2[0-3]):([0-5][0-9])(?::([0-5][0-9])(?:\.([0-9]{2}))?)?$/;

export class SelectionTime extends SelectionAny {
    valueAsTime() {
        return this.value().map(v => {
            // TODO move this to a dedicated file
            if (!v) {
                return null;
            }
            const groups = rNameParts.exec(v);
            if (!groups) {
                return null;
            }
            const hours = parseInt(groups[0]);
            const minutes = parseInt(groups[1]);
            const hoursMinutes = {
                hours,
                minutes,
            };
            if (groups[2] !== undefined) {
                const seconds = parseInt(groups[2]);
                const hoursMinutesSeconds = {
                    ...hoursMinutes,
                    seconds,
                };
                if (groups[3] !== undefined) {
                    const centiseconds = parseInt(groups[3]);
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
        });
    }
}

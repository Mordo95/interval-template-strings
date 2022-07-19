const TimeRegexp = /(?<value>[+-]?\d+(\.\d+)?)\s*(?<unit>[a-zA-Z]+)/g;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const month = Math.round(week * 4.34524);
const year = month * 12;

/**
 * Parse the number format to the equivalent milliseconds
 *
 * @param digit
 * @param format
 * @returns number
 */
function parseNumberFormat(value, unit) {
    const n = new Number(value);
    switch(unit) {
        case "ms":
        case "millisecond":
        case "milliseconds":
            return n;
        case "s":
        case "second":
        case "seconds":
            return n * second;
        case "m":
        case "minute":
        case "minutes":
            return n * minute;
        case "h":
        case "hour":
        case "hours":
            return n * hour;
        case "d":
        case "day":
        case "days":
            return n * day;
        case "w":
        case "week":
        case "weeks":
            return n * week;
        case "mo":
        case "month":
        case "months":
            return n * month;
        case "y":
        case "year":
        case "years":
            return n * year;
        default:
            throw new Error(`${unit} is not a valid time unit`);
    }
}

/**
 * Takes a time string and turns it into milliseconds
 *
 * @param strIn
 * @param parts
 * @returns number
 */
export function T(strIn, ...parts) {
    const str = String.raw(strIn, parts).toLowerCase().replace(/\s/g, '');
    const parsed = [...str.matchAll(TimeRegexp)];
    if (parsed.length === 0)
        throw new Error(`"${str}" is not a valid interval string`);
    let out = 0;
    for (const res of parsed) {
        out += Math.round(parseNumberFormat(res.groups.value, res.groups.unit));
    }
    return out;
}

/**
 * Takes a time string and turns it into round seconds
 *
 * @param strIn
 * @param parts
 * @returns number
 */
export function _T(strIn, ...parts) {
    return Math.round(T(strIn, parts) / 1000);
}
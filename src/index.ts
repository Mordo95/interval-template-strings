const second: number = 1000;
const minute: number = second * 60;
const hour: number = minute * 60;
const day: number = hour * 24;
const week: number = day * 7;
const month: number = week * 4.34524;
const year: number = month * 12;

type MsUnits = "ms" | "millisecond" | "milliseconds";
type SUnits = "s" | "second" | "seconds";
type MUnits = "m" | "minute" | "minutes";
type HUnits = "h" | "hour" | "hours";
type DUnits = "d" | "day" | "days";
type WUnits = "w" | "week" | "weeks";
type MoUnits = "mo" | "month" | "months";
type YUnits = "y" | "year" | "years";

export type Unit = MsUnits | SUnits | MUnits | HUnits | DUnits | WUnits | MoUnits | YUnits;

const flags = ["n", "d"] as const;

const TimeRegexp = new RegExp(`(?<value>[+-]?\\d+(\\.\\d+)?)\\s*(?<unit>[a-zA-Z]+)|(?<hms>[+-]?\\d{1,2}:\\d{1,2}(:\\d{1,2})?)|;(?<flags>[${flags.join('')}]+)$`, "g");

export type IntervalRegeExpGroupMatch = {
    value: string,
    unit: string,
    hms: string,
    flags: string
}

interface IntervalRegExpMatchArray extends RegExpMatchArray {
    groups?: Partial<IntervalRegeExpGroupMatch>,
}

class IntervalTemplateString {
    private value: number = 0;

    constructor(str: string | number, flags?: string) {
        if (typeof str === "number") {
            this.value = str;
        } else {
            this.parse(flags ? `${str};${flags}` : str);
        }
    }

    /**
     * Chops up the string parts, validates each one, runs the flags and sets internal value to the outcome
     * @param str 
     */
    private parse(str: String) {
        str = str.replace(/\s/g, '');
        const parsed: IntervalRegExpMatchArray[] = <IntervalRegExpMatchArray[]>[...str.matchAll(TimeRegexp)];
        if (parsed.length === 0) throw new Error(`"${str}" is not a valid interval string, no suitable items found`);
        let out = 0;
        let flagsStr = "";
        for (const res of parsed) {
            if (!res.groups) throw new Error(`"${str}" is not a valid interval string, no groups found`);
            if (res.groups.value && res.groups.unit && !res.groups.hms) {
                out += this.parseNumberFormat(res.groups.value, <Unit>res.groups.unit);
            } else if (res.groups.hms) {
                out += this.parseHMSFormat(res.groups.hms);
            } else if (res.groups.flags) {
                flagsStr = res.groups.flags;
            } else {
                throw new Error(`"${str}" is not a valid interval string, no valid groups`);
            }
        }
        this.value = Math.round(this.processFlags(out, flagsStr))
    }

    /**
     * Validates the flags and adjusts the value param to the given flags
     * @param value a converted value
     * @param flagsStr a char array with the given flags
     * @returns value processed after flags
     */
    private processFlags(value: number, flagsStr: string) {
        if (flagsStr === "") return value;
        const flagsArr = [...flagsStr];
        if (!flagsArr.some(x => (flags as ReadonlyArray<string>).includes(x))) {
            throw new Error(`"${flagsStr}" does not contain any valid flags`);
        }
        for(const flag of flagsArr) {
            switch(flag) {
                case "n":
                    value += +new Date();
                break;
                case "d":
                    value /= 1000;
                break;
            }
        }
        return value;
    }

    /**
     * Validates and parses a HH:MM or HH:MM:SS string into it's timestamp equivalement
     * @param hmsString A string in the format of HH:MM:SS, HH:MM, allowing positive or negative values
     * @returns the timestamp equivalement of said string
     */
    private parseHMSFormat(hmsString: string) {
        let positive = true;
        if (/[+-]/.test(hmsString[0])) {
            positive = hmsString[0] === "+";
            hmsString = hmsString.substring(1, hmsString.length);
        }
        const split = hmsString.split(":");
        if (split.length !== 2 && split.length !== 3) throw new Error(`${hmsString} is not a valid HMS string`);
        let out = parseInt(split[0]) * hour + parseInt(split[1]) * minute;
        if (split.length === 3) {
            out += parseInt(split[2]) * second;
        }
        return positive ? out : -out;
    }

    /**
     * Parse the number format to the equivalent milliseconds
     *
     * @param value a numeric string that can be converted to a float
     * @param unit the unit the value should be converted to
     * @returns the numeric value according to value and unit params
     */
    private parseNumberFormat(value: string, unit: Unit) {
        const n: number = parseFloat(value);
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

    [Symbol.toPrimitive](): number {
        return this.value;
    }

    valueOf() {
        return this.value;
    }

    toDate() {
        return new Date(this.value);
    }

    toString() {
        return this.value.toString();
    }
}

/**
 * Takes a time string and turns it into milliseconds
 *
 * @param strIn
 * @param parts
 * @returns number
 */
export function T(strIn: TemplateStringsArray, ...parts: string[]) {
    const str = String.raw(strIn, parts).toLowerCase();
    return new IntervalTemplateString(str);
}
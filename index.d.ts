
interface TimeRegexpResult {
    groups: {
      value: string;
      unit: string;
    }
}

/**
 * Parse the number format to the equivalent milliseconds
 *
 * @param digit
 * @param format
 * @returns number
 */
function parseNumberFormat(digit: string, format: string): number

/**
 * Takes a time string and turns it into milliseconds
 *
 * @param strIn
 * @param parts
 * @returns number
 */
export function T(strIn: TemplateStringsArray, ...parts: any[]): number

/**
 * Takes a time string and turns it into round seconds
 *
 * @param strIn
 * @param parts
 * @returns number
 */
export function _T(strIn: TemplateStringsArray, ...parts: any[]): number
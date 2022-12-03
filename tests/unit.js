'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const IntervalTemplateStrings_1 = require("../src/IntervalTemplateStrings");
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const month = week * 4.34524;
const year = month * 12;
const assertEqualRound = (actual, expected, message) => assert_1.default.equal(actual, Math.round(expected), message);
describe('T()', () => {
    it('should allow short string formatting', () => {
        assertEqualRound((0, IntervalTemplateStrings_1.T) `30ms`, 30);
        assertEqualRound((0, IntervalTemplateStrings_1.T) `30s`, 30 * second);
        assertEqualRound((0, IntervalTemplateStrings_1.T) `1m`, minute);
        assertEqualRound((0, IntervalTemplateStrings_1.T) `1h`, hour);
        assertEqualRound((0, IntervalTemplateStrings_1.T) `1d`, day);
        assertEqualRound((0, IntervalTemplateStrings_1.T) `1w`, week);
        assertEqualRound((0, IntervalTemplateStrings_1.T) `1mo`, month);
        assertEqualRound((0, IntervalTemplateStrings_1.T) `1y`, year);
    });
    it('should allow long string formatting', () => {
        assertEqualRound((0, IntervalTemplateStrings_1.T) `30 milliseconds`, 30);
        assertEqualRound((0, IntervalTemplateStrings_1.T) `30 seconds`, 30 * second);
        assertEqualRound((0, IntervalTemplateStrings_1.T) `1 minutes`, minute);
        assertEqualRound((0, IntervalTemplateStrings_1.T) `1 hours`, hour);
        assertEqualRound((0, IntervalTemplateStrings_1.T) `1 days`, day);
        assertEqualRound((0, IntervalTemplateStrings_1.T) `1 weeks`, week);
        assertEqualRound((0, IntervalTemplateStrings_1.T) `1 months`, month);
        assertEqualRound((0, IntervalTemplateStrings_1.T) `1 years`, year);
    });
    it('should allow mixed short and long string formatting', () => {
        assertEqualRound((0, IntervalTemplateStrings_1.T) `1s 300 milliseconds`, second + 300);
        assertEqualRound((0, IntervalTemplateStrings_1.T) `1m 30 seconds`, 90 * second);
        assertEqualRound((0, IntervalTemplateStrings_1.T) `1h 30 seconds`, hour + 30 * second);
        assertEqualRound((0, IntervalTemplateStrings_1.T) `1d 30 seconds`, day + 30 * second);
        assertEqualRound((0, IntervalTemplateStrings_1.T) `1w 30 seconds`, week + 30 * second);
        assertEqualRound((0, IntervalTemplateStrings_1.T) `1mo 30 seconds`, month + 30 * second);
        assertEqualRound((0, IntervalTemplateStrings_1.T) `1y 30 seconds`, year + 30 * second);
    });
    it('should allow floating point numbers', () => {
        assertEqualRound((0, IntervalTemplateStrings_1.T) `3.0 milliseconds`, 3);
        assertEqualRound((0, IntervalTemplateStrings_1.T) `3.0 seconds`, 3 * second);
        assertEqualRound((0, IntervalTemplateStrings_1.T) `1.2 minutes`, Math.round(minute * 1.2));
        assertEqualRound((0, IntervalTemplateStrings_1.T) `1.2 hours`, Math.round(hour * 1.2));
        assertEqualRound((0, IntervalTemplateStrings_1.T) `1.2 days`, Math.round(day * 1.2));
        assertEqualRound((0, IntervalTemplateStrings_1.T) `1.2 weeks`, Math.round(week * 1.2));
        assertEqualRound((0, IntervalTemplateStrings_1.T) `1.2 months`, Math.round(month * 1.2));
        assertEqualRound((0, IntervalTemplateStrings_1.T) `1.2 years`, Math.round(year * 1.2));
    });
    it('should allow negative numbers', () => {
        assertEqualRound((0, IntervalTemplateStrings_1.T) `1s-500ms`, 500);
        assertEqualRound((0, IntervalTemplateStrings_1.T) `30s-10s`, 20 * second);
        assertEqualRound((0, IntervalTemplateStrings_1.T) `10m-1m`, minute * 9);
        assertEqualRound((0, IntervalTemplateStrings_1.T) `10h-1h`, hour * 9);
        assertEqualRound((0, IntervalTemplateStrings_1.T) `10d-1d`, day * 9);
        assertEqualRound((0, IntervalTemplateStrings_1.T) `10w-1w`, week * 9);
        assertEqualRound((0, IntervalTemplateStrings_1.T) `10mo-1mo`, month * 9);
        assertEqualRound((0, IntervalTemplateStrings_1.T) `10y-1y`, year * 9);
    });
    it('should allow HH:MM:SS format, positive and negative', () => {
        assertEqualRound((0, IntervalTemplateStrings_1.T) `10:01:10`, 10 * hour + minute + 10 * second);
        assertEqualRound((0, IntervalTemplateStrings_1.T) `-10:01:10`, -(10 * hour + minute + 10 * second));
        assertEqualRound((0, IntervalTemplateStrings_1.T) `+10:01:10`, 10 * hour + minute + 10 * second);
    });
    it('should allow HH:MM format, positive and negative', () => {
        assertEqualRound((0, IntervalTemplateStrings_1.T) `10:01`, 10 * hour + minute);
        assertEqualRound((0, IntervalTemplateStrings_1.T) `-10:01`, -(10 * hour + minute));
        assertEqualRound((0, IntervalTemplateStrings_1.T) `+10:01`, 10 * hour + minute);
    });
    it('should give zero on a zero value', () => {
        assertEqualRound((0, IntervalTemplateStrings_1.T) `0 years`, 0);
    });
    it('should allow multiple of the same units', () => {
        assertEqualRound((0, IntervalTemplateStrings_1.T) `1 day 1 day`, day * 2);
    });
    it('should throw an exception on an invalid string', () => {
        assert_1.default.throws(() => (0, IntervalTemplateStrings_1.T) `3 foobars`, Error);
        assert_1.default.throws(() => (0, IntervalTemplateStrings_1.T) `ab foobars`, Error);
    });
});

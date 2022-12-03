'use strict'
import assert from 'assert';
import { T } from '../src';

const second: number = 1000;
const minute: number = second * 60;
const hour: number = minute * 60;
const day: number = hour * 24;
const week: number = day * 7;
const month: number = week * 4.34524;
const year: number = month * 12;

const assertEqualRound = (actual: unknown, expected: number, message?: string | Error) => assert.equal(actual, Math.round(expected), message)

describe('T()', () => {
    it('should allow short string formatting', () => {
        assertEqualRound(T`30ms`, 30);
        assertEqualRound(T`30s`, 30 * second);
        assertEqualRound(T`1m`, minute);
        assertEqualRound(T`1h`, hour);
        assertEqualRound(T`1d`, day);
        assertEqualRound(T`1w`, week);
        assertEqualRound(T`1mo`, month);
        assertEqualRound(T`1y`, year);
    });
    it('should allow long string formatting', () => {
        assertEqualRound(T`30 milliseconds`, 30);
        assertEqualRound(T`30 seconds`, 30 * second);
        assertEqualRound(T`1 minutes`, minute);
        assertEqualRound(T`1 hours`, hour);
        assertEqualRound(T`1 days`, day);
        assertEqualRound(T`1 weeks`, week);
        assertEqualRound(T`1 months`, month);
        assertEqualRound(T`1 years`, year);
    });
    it('should allow mixed short and long string formatting', () => {
        assertEqualRound(T`1s 300 milliseconds`, second + 300);
        assertEqualRound(T`1m 30 seconds`, 90 * second);
        assertEqualRound(T`1h 30 seconds`, hour + 30 * second);
        assertEqualRound(T`1d 30 seconds`, day + 30 * second);
        assertEqualRound(T`1w 30 seconds`, week + 30 * second);
        assertEqualRound(T`1mo 30 seconds`, month + 30 * second);
        assertEqualRound(T`1y 30 seconds`, year + 30 * second);
    });
    it('should allow floating point numbers', () => {
        assertEqualRound(T`3.0 milliseconds`, 3);
        assertEqualRound(T`3.0 seconds`, 3 * second);
        assertEqualRound(T`1.2 minutes`, Math.round(minute * 1.2));
        assertEqualRound(T`1.2 hours`, Math.round(hour * 1.2));
        assertEqualRound(T`1.2 days`, Math.round(day * 1.2));
        assertEqualRound(T`1.2 weeks`, Math.round(week * 1.2));
        assertEqualRound(T`1.2 months`, Math.round(month * 1.2));
        assertEqualRound(T`1.2 years`, Math.round(year * 1.2));
    });
    it('should allow negative numbers', () => {
        assertEqualRound(T`1s-500ms`, 500);
        assertEqualRound(T`30s-10s`, 20 * second);
        assertEqualRound(T`10m-1m`, minute * 9);
        assertEqualRound(T`10h-1h`, hour * 9);
        assertEqualRound(T`10d-1d`, day * 9);
        assertEqualRound(T`10w-1w`, week * 9);
        assertEqualRound(T`10mo-1mo`, month * 9);
        assertEqualRound(T`10y-1y`, year * 9);
    });
    it('should allow HH:MM:SS format, positive and negative', () => {
        assertEqualRound(T`10:01:10`, 10 * hour + minute + 10 * second);
        assertEqualRound(T`-10:01:10`, -(10 * hour + minute + 10 * second));
        assertEqualRound(T`+10:01:10`, 10 * hour + minute + 10 * second);
    });
    it('should allow HH:MM format, positive and negative', () => {
        assertEqualRound(T`10:01`, 10 * hour + minute);
        assertEqualRound(T`-10:01`, -(10 * hour + minute));
        assertEqualRound(T`+10:01`, 10 * hour + minute);
    });
    it('should give zero on a zero value', () => {
        assertEqualRound(T`0 years`, 0);
    });
    it('should allow multiple of the same units', () => {
        assertEqualRound(T`1 day 1 day`, day * 2);
    });
    it('should throw an exception on an invalid string', () => {
        assert.throws(() => T`3 foobars`, Error);
        assert.throws(() => T`ab foobars`, Error);
    });
});
'use strict'
import assert from 'assert';
import {T, _T} from "../index.js";

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const month = Number.parseInt(week * 4.34524);
const year = month * 12;

describe('T()', () => {
    it('should allow short string formatting', () => {
        assert.equal(T`30ms`, 30);
        assert.equal(T`30s`, 30 * second);
        assert.equal(T`1m`, minute);
        assert.equal(T`1h`, hour);
        assert.equal(T`1d`, day);
        assert.equal(T`1w`, week);
        assert.equal(T`1mo`, month);
        assert.equal(T`1y`, year);
    });
    it('should allow long string formatting', () => {
        assert.equal(T`30 milliseconds`, 30);
        assert.equal(T`30 seconds`, 30 * second);
        assert.equal(T`1 minutes`, minute);
        assert.equal(T`1 hours`, hour);
        assert.equal(T`1 days`, day);
        assert.equal(T`1 weeks`, week);
        assert.equal(T`1 months`, month);
        assert.equal(T`1 years`, year);
    });
    it('should allow mixed short and long string formatting', () => {
        assert.equal(T`1s 300 milliseconds`, second + 300);
        assert.equal(T`1m 30 seconds`, 90 * second);
        assert.equal(T`1h 30 seconds`, hour + 30 * second);
        assert.equal(T`1d 30 seconds`, day + 30 * second);
        assert.equal(T`1w 30 seconds`, week + 30 * second);
        assert.equal(T`1mo 30 seconds`, month + 30 * second);
        assert.equal(T`1y 30 seconds`, year + 30 * second);
    });
    it('should allow floating point numbers', () => {
        assert.equal(T`3.0 milliseconds`, 3);
        assert.equal(T`3.0 seconds`, 3 * second);
        assert.equal(T`1.2 minutes`, Math.round(minute * 1.2));
        assert.equal(T`1.2 hours`, Math.round(hour * 1.2));
        assert.equal(T`1.2 days`, Math.round(day * 1.2));
        assert.equal(T`1.2 weeks`, Math.round(week * 1.2));
        assert.equal(T`1.2 months`, Math.round(month * 1.2));
        assert.equal(T`1.2 years`, Math.round(year * 1.2));
    });
    it('should allow negative numbers', () => {
        assert.equal(T`1s-500ms`, 500);
        assert.equal(T`30s-10s`, 20 * second);
        assert.equal(T`10m-1m`, minute * 9);
        assert.equal(T`10h-1h`, hour * 9);
        assert.equal(T`10d-1d`, day * 9);
        assert.equal(T`10w-1w`, week * 9);
        assert.equal(T`10mo-1mo`, month * 9);
        assert.equal(T`10y-1y`, year * 9);
    });
    it('should give zero on a zero value', () => {
        assert.equal(T`0 years`, 0);
    });
    it('should allow multiple of the same units', () => {
        assert.equal(T`1 day 1 day`, day * 2);
    });
    it('should throw an exception on an invalid string', () => {
        assert.throws(() => T`3 foobars`, Error);
        assert.throws(() => T`ab foobars`, Error);
    });
});

describe("_T()", () => {
    it('is always returned in seconds', () => {
        assert.equal(_T`30 milliseconds`, Math.round(30 / 1000));
        assert.equal(_T`30 seconds`, Math.round((30 * second) / 1000));
        assert.equal(_T`1 minutes`, Math.round(minute / 1000));
        assert.equal(_T`1 hours`, Math.round(hour / 1000));
        assert.equal(_T`1 days`, Math.round(day / 1000));
        assert.equal(_T`1 weeks`, Math.round(week / 1000));
        assert.equal(_T`1 months`, Math.round(month / 1000));
        assert.equal(_T`1 years`, Math.round(year / 1000));
    });
});
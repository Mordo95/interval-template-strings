
# Interval Template Strings
A simple package that allows you to use nicely formatted interval strings when working with time.
This package was made with inspiration from the [sql-template-strings](https://www.npmjs.com/package/sql-template-strings) package.

Working with intervals in nodejs can be kind of sloppy from time to time. Constantly having to go over how much milliseconds a specific time actually is, constantly having to recalculate back and forth on it, and in worst case cenario, make your timings hard to read. This package brings a fix to that problem with only a single import and no additional dependencies.

## How?
Thanks to javascript's beautiful processing of template strings, it's as easy as;
```js
import { T } from 'interval-template-strings';

// long 
T`3 hours 20 seconds`
// or short
T`3h20s`
// and for SQL convinience, also in seconds
_T`1 day - 3.5 hours`
```

## Unit definitions
The package allows units to be written in singular, plural and in short form. Their values can be written as integer, floating point and even negative values.
| Unit | Short form |
|------|------------|
| milliseconds | ms |
| seconds      | s  |
| minutes      | m  |
| hours        | h  |
| days         | d  |
| months       | mo |
| years        | y  |

## Some examples
```js
/*
 * Adding an element to an array every 2.5 hours
 */

let myArray = [];
let i = 0;

setInterval(() => {
	myArray.push(i++);
}, 1000 * 60 * 60 * 2.5);
```
With template string:
```js
import { T } from 'interval-template-strings';

let myArray = [];
let i = 0;

setInterval(() => {
	myArray.push(i++);
}, T`2.5 hours`);
```
Or the long way;
```js
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

console.log("I'll see you in 3 days!");
setTimeout(() => console.log("I last saw you 3 days ago!"), DAY * 3);
```
With template string;
```js
import { T } from 'interval-template-strings';

console.log("I'll see you in 3 days!");
setTimeout(() => console.log("I last saw you 3 days ago!"), T`3 days`);
```
Or if you don't like to use `T`;
```js
import { T as INTERVAL } from 'interval-template-strings';

console.log(INTERVAL`30 seconds`);
```

## Contributing
* Tests are written with [Mocha](https://www.npmjs.com/package/mocha)
* Currently there's no linter configured but I might change this in the future.
* It is written as ESM and I'm not planning to support CommonJS.
* Test code with `npm test`
* I am open for pull requests, feature enhancements and bug reports.
### Special thanks
* [FinlayDaG33k](https://github.com/FinlayDaG33k) for typescript definitions
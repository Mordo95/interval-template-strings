
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
// using HH:MM format
T`03:04`
// or HH:MM:SS
T`03:04:05`
// positive or negative
T`3d - 1d + 12:40:05` // will be the same as T`3d - 1d 12h 40m 5s`
// and a convertible output:
T`3d -12:40:05;d` // This will be in seconds!
```

## Unit definitions
The package allows units to be written in singular, plural and in short form. Their values can be written as integer, floating point and even negative values.

| Unit | Short form |
|------|------------|
| milliseconds | ms |
| seconds | s |
| minutes | m |
| hours | h |
| days | d |
| months | mo |
| years | y |

## `New` Time format
From a feature request, instead of writing `1w 2d 3h 4m 5s` you can now write `1w 2d 03:04:05` or without seconds, `1w 2d 03:04`

## `New` Flags
Due to my own constant irritation to converting back and forth to `Date` to get offsets for now or database formats (previously `_T`), a flag system has been added to convert your output to your desired numeric format. Neat!

 | Flag | Description |
|----|-----------|
| n  | Value adjusted to offset `Date.now()` |
| d  | Value adjusted to seconds for SQL formats |
  

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
setTimeout(() =>  console.log("I last saw you 3 days ago!"), DAY * 3);
```
With template string;
```js
import { T } from 'interval-template-strings';
console.log("I'll see you in 3 days!");
setTimeout(() =>  console.log("I last saw you 3 days ago!"), T`3 days`);
```
Or if you don't like to use `T`;
```js
import { T as INTERVAL } from 'interval-template-strings';
console.log(INTERVAL`30 seconds`);
```

## Contributing
* Tests are written with [Mocha](https://www.npmjs.com/package/mocha)
* Currently there's no linter configured but I might change this in the future.
* I am open for pull requests, feature enhancements and bug reports.

Start up the environment by pulling the git and running `npm install`. Run tests with `npm test`.

### Version history

#### 1.0
- Added `T` and `_T` for converting strings and one to convert to database formats
- Setup tests

#### 1.1
- Removed `_T`
- Typescriptified the whole project
- Added HH:MM:SS and HH:MM support
- Added flags `n` for offsetting to `Date.now()`, `d` to replace _T and convert the output to seconds
- Grouped all functions to classes
- Added more typescript types

### Special thanks
* [FinlayDaG33k](https://github.com/FinlayDaG33k) for initial typescript definitions
# Week-Utils
A collection of week util written with TypeScript, inspired by moment.js, depend nothing.

- get the total weeks in year
- get the current (or specific date) week number in year
- get the start and end date of a week, specific by year and week number

# Week Numbering Systems

Currently, the library support two kinds of week numbering system:

- ISO 8601 (default, Most of European and Asian countries)
>The first day of the week is Monday and Sunday is the last.
The week that contains Jan 4th is the first week of the year.

- North American (USA, Canada, most of Latin America, Japan, Israel, South Korea)
>The first day of a week is Sunday and Saturday is the last.
The first week (numbered 1) of any given year is the week which contains January 1st.

# Install

```
npm install week-utils
```

# The doy calculate rule

`doy` is calculated as `7 + dow - janX`, where `janX` is the `x-th` January that must belong to the week No. 1.

# Usage

the default week system is IOS 8601, the necessary params is:

- dow : 1 (1st day of week is Monday)
- doy : 4 (The week that contains Jan 4th is the first week of the year.);doy=(7 + 1 - 4)

>the corresponding fields - firstDay: 1 (Monday) lastDay: 7 (Sunday)


you can send param dow: 0, doy: 6 to use the North American system.

- dow : 0 (1st day of week is Sunday)
- doy : 6 (1st week of the year is the one that contains the 1st of January);doy=(7 + 0 - 1)

>the corresponding fields - firstDay: 0 (Sunday) lastDay: 6 (Saturday)

```js
// const WeekUtils = require("week-utils").default;
import WeekUtils from "week-utils";

// IOS 8601, default
const weekUtils = new WeekUtils();
// get the total weeks of a year
weekUtils.localWeeks(2018);  //52

const aDate = new Date(2019, 7-1, 14);
// get the current week number of the year
weekUtils.curWeek(aDate); //28
// get the start and end date of a week
weekUtils.getWeekDate(2019, 28).weekStart // 2019-07-08 (Date)
weekUtils.getWeekDate(2019, 28).weekEnd // 2019-07-14 (Date)

// North American system
const weekUtils = new WeekUtils(0, 6); // params: dow=0, doy=6
// usage is the same
...

```

# Api

| Method | Description | Default |
| --- | --- | --- |
| localWeeks | get the total weeks of a year | get current year's total weeks |
| curWeek | get the current week number of the year according by a specific date | get current week number |
| getWeekDate | get the start and end date of a week | - |

# License

MIT

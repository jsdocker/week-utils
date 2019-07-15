# Week-Utils
A collection of week util written with TypeScript, inspired by moment.js, depend nothing.

- get total weeks in year
- get current(or specific date) week number in year
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

`npm install week-utils`

# Usage

the default week system is IOS 8601, the params is:

- dow : 1 (1st day of week is Monday)
- doy : 4 (`doy` is calculated as `7 + dow - janX`, where `janX` is the `x-th` January that must belong to the week No. 1. --(7 + 1 - 4))
- firstDay: 1 (Monday)
- lastDay: 7 (Sunday)


you can send param dow: 0, doy: 6 to use the North American system.

- dow : 0 (1st day of week is Sunday)
- doy : 6 (1st week of the year is the one that contains the 1st of January (7 + 0 - 1))
- firstDay: 0 (Sunday)
- lastDay: 6 (Saturday)




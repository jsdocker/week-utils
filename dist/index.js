"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    var localWeekday = (7 + weekday - dow) % 7, weekOffset = firstWeekOffset(year, dow, doy), dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset, resYear, resDayOfYear;
    if (dayOfYear <= 0) {
        resYear = year - 1;
        resDayOfYear = daysInYear(resYear) + dayOfYear;
    }
    else if (dayOfYear > daysInYear(year)) {
        resYear = year + 1;
        resDayOfYear = dayOfYear - daysInYear(year);
    }
    else {
        resYear = year;
        resDayOfYear = dayOfYear;
    }
    return {
        year: resYear,
        dayOfYear: resDayOfYear
    };
}
function getDayOfYear(year, n) {
    var startOfYear = new Date(year, 0, 1);
    startOfYear.setDate(startOfYear.getDate() + (n - 1));
    return startOfYear;
}
function localeWeek(mom, dow, doy) {
    return weekOfYear(mom, dow, doy).week;
}
function weekOfYear(mom, dow, doy) {
    var weekOffset = firstWeekOffset(mom.getFullYear(), dow, doy), week = Math.floor((dayOfYear(mom) - weekOffset - 1) / 7) + 1, resWeek, resYear;
    if (week < 1) {
        resYear = mom.getFullYear() - 1;
        resWeek = week + weeksInYear(resYear, dow, doy);
    }
    else if (week > weeksInYear(mom.getFullYear(), dow, doy)) {
        resWeek = week - weeksInYear(mom.getFullYear(), dow, doy);
        resYear = mom.getFullYear() + 1;
    }
    else {
        resYear = mom.getFullYear();
        resWeek = week;
    }
    return {
        week: resWeek,
        year: resYear
    };
}
function dayOfYear(mom) {
    var dayOfYear = Math.round((startOf('day', mom) - startOf('year', mom)) / 864e5) + 1;
    return dayOfYear;
}
function startOf(untis, mom) {
    var time = 0;
    switch (untis) {
        case 'year':
            time = new Date(mom.getFullYear(), 0, 1).valueOf();
            break;
        case 'day':
            time = new Date(mom.getFullYear(), mom.getMonth(), mom.getDate()).valueOf();
            break;
    }
    return time;
}
function weeksInYear(year, dow, doy) {
    var weekOffset = firstWeekOffset(year, dow, doy);
    var weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}
function firstWeekOffset(year, dow, doy) {
    var fwd = 7 + dow - doy;
    var fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
    return -fwdlw + fwd - 1;
}
function createUTCDate(y, m, d) {
    var date;
    if (y < 100 && y >= 0) {
        date = new Date(Date.UTC.apply(null, [y + 400, m, d]));
        if (isFinite(date.getUTCFullYear())) {
            date.setUTCFullYear(y);
        }
    }
    else {
        date = new Date(Date.UTC.apply(null, [y, m, d]));
    }
    return date;
}
function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
var WeekUtils = (function () {
    function WeekUtils(dow, doy) {
        this.dow = 1;
        this.doy = 4;
        this.firstDay = 1;
        this.lastDay = 7;
        if (dow === 0 && doy === 6) {
            this.dow = dow;
            this.doy = doy;
            this.firstDay = 0;
            this.lastDay = 6;
        }
    }
    WeekUtils.prototype.getWeekDate = function (year, n) {
        var start = dayOfYearFromWeeks(year, n, this.firstDay, this.dow, this.doy);
        var end = dayOfYearFromWeeks(year, n, this.lastDay, this.dow, this.doy);
        return {
            weekStart: getDayOfYear(start.year, start.dayOfYear),
            weekEnd: getDayOfYear(end.year, end.dayOfYear)
        };
    };
    WeekUtils.prototype.curWeek = function (date) {
        var mom = new Date();
        if (date) {
            mom = date;
        }
        var week = localeWeek(mom, this.dow, this.doy);
        return week;
    };
    WeekUtils.prototype.localWeeks = function (input) {
        var mom = new Date();
        var year = mom.getFullYear();
        if (input) {
            year = input;
        }
        return weeksInYear(year, this.dow, this.doy);
    };
    return WeekUtils;
}());
exports.default = WeekUtils;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WeekUtil = /** @class */ (function () {
    /**
     * constructor
     * @param dow default：1
     * @param doy default：4
     */
    function WeekUtil(dow, doy) {
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
    /**
     * return week start and end date according to specific year and week, result like: {weekStart: Date, weekEnd: Date}
     * @param year year
     * @param n week number
     */
    WeekUtil.prototype.getWeekDate = function (year, n) {
        var start = this.dayOfYearFromWeeks(year, n, this.firstDay, this.dow, this.doy);
        var end = this.dayOfYearFromWeeks(year, n, this.lastDay, this.dow, this.doy);
        return {
            weekStart: this.getDayOfYear(year, start.dayOfYear),
            weekEnd: this.getDayOfYear(year, end.dayOfYear)
        };
    };
    WeekUtil.prototype.dayOfYearFromWeeks = function (year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7, weekOffset = this.firstWeekOffset(year, dow, doy), dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset, resYear, resDayOfYear;
        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = this.daysInYear(resYear) + dayOfYear;
        }
        else if (dayOfYear > this.daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - this.daysInYear(year);
        }
        else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }
        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    };
    WeekUtil.prototype.getDayOfYear = function (year, n) {
        var startOfYear = new Date(year, 0, 1);
        startOfYear.setDate(startOfYear.getDate() + (n - 1));
        return startOfYear;
    };
    /**
     * return current week according to a specific date
     * @param date the date
     */
    WeekUtil.prototype.curWeek = function (date) {
        var mom = new Date();
        if (date) {
            mom = date;
        }
        var week = this.localeWeek(mom);
        return week;
    };
    WeekUtil.prototype.localeWeek = function (mom) {
        return this.weekOfYear(mom, this.dow, this.doy).week;
    };
    WeekUtil.prototype.weekOfYear = function (mom, dow, doy) {
        var weekOffset = this.firstWeekOffset(mom.getFullYear(), dow, doy), week = Math.floor((this.dayOfYear(mom) - weekOffset - 1) / 7) + 1, resWeek, resYear;
        if (week < 1) {
            resYear = mom.getFullYear() - 1;
            resWeek = week + this.weeksInYear(resYear, dow, doy);
        }
        else if (week > this.weeksInYear(mom.getFullYear(), dow, doy)) {
            resWeek = week - this.weeksInYear(mom.getFullYear(), dow, doy);
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
    };
    WeekUtil.prototype.dayOfYear = function (mom) {
        var dayOfYear = Math.round((this.startOf('day', mom) - this.startOf('year', mom)) / 864e5) + 1;
        return dayOfYear;
    };
    WeekUtil.prototype.startOf = function (untis, mom) {
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
    };
    /**
     * return the total weeks in a year
     * @param input the year
     */
    WeekUtil.prototype.localWeeks = function (input) {
        var mom = new Date();
        var year = mom.getFullYear();
        if (input) {
            year = input;
        }
        return this.weeksInYear(year, this.dow, this.doy);
    };
    WeekUtil.prototype.weeksInYear = function (year, dow, doy) {
        var weekOffset = this.firstWeekOffset(year, dow, doy);
        var weekOffsetNext = this.firstWeekOffset(year + 1, dow, doy);
        return (this.daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    };
    WeekUtil.prototype.firstWeekOffset = function (year, dow, doy) {
        var fwd = 7 + dow - doy;
        var fwdlw = (7 + this.createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
        return -fwdlw + fwd - 1;
    };
    WeekUtil.prototype.createUTCDate = function (y, m, d) {
        var date;
        // the Date.UTC function remaps years 0-99 to 1900-1999
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
    };
    WeekUtil.prototype.daysInYear = function (year) {
        return this.isLeapYear(year) ? 366 : 365;
    };
    WeekUtil.prototype.isLeapYear = function (year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };
    return WeekUtil;
}());
exports.default = WeekUtil;

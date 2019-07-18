export default class WeekUtils {
    dow: number;
    doy: number;
    firstDay: number;
    lastDay: number;
    /**
     * constructor
     * @param dow default：1 (1st day of week is Monday)
     * @param doy default：4 (The week that contains Jan 4th is the first week of the year)
     */
    constructor(dow?: number, doy?: number);
    /**
     * return week start and end date according to specific year and week, result like: {weekStart: Date, weekEnd: Date}
     * @param year year
     * @param n week number
     */
    getWeekDate(year: number, n: number): {
        weekStart: Date;
        weekEnd: Date;
    };
    dayOfYearFromWeeks(year: number, week: number, weekday: number, dow: number, doy: number): {
        year: number;
        dayOfYear: number;
    };
    getDayOfYear(year: number, n: number): Date;
    /**
     * return current week according to a specific date
     * @param date the date
     */
    curWeek(date?: Date): number;
    localeWeek(mom: Date): number;
    weekOfYear(mom: Date, dow: number, doy: number): {
        week: number;
        year: number;
    };
    dayOfYear(mom: Date): number;
    startOf(untis: string, mom: Date): number;
    /**
     * return the total weeks in a year
     * @param input the year
     */
    localWeeks(input: number): number;
    weeksInYear(year: number, dow: number, doy: number): number;
    firstWeekOffset(year: number, dow: number, doy: number): number;
    createUTCDate(y: number, m: number, d: number): Date;
    daysInYear(year: number): 366 | 365;
    isLeapYear(year: number): boolean;
}

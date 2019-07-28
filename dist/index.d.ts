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
    /**
     * return current week according to a specific date
     * @param date the date
     */
    curWeek(date?: Date): number;
    /**
     * return the total weeks in a year
     * @param input the year
     */
    localWeeks(input: number): number;
}

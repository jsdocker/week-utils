export default class WeekUtils {
    dow: number;
    doy: number;
    firstDay: number;
    lastDay: number;
    constructor(dow?: number, doy?: number);
    getWeekDate(year: number, n: number): {
        weekStart: Date;
        weekEnd: Date;
    };
    curWeek(date?: Date): number;
    localWeeks(input: number): number;
}

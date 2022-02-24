import WeekUtil from '../index';
const weekUtil = new WeekUtil();
const weekUtilEn = new WeekUtil(0, 6);

function format(date: Date, fmt: string = 'yyyy-MM-dd') {
  var o: any = {
    "M+" : date.getMonth()+1,                 //月份
    "d+" : date.getDate(),                    //日
    "h+" : date.getHours(),                   //小时
    "m+" : date.getMinutes(),                 //分
    "s+" : date.getSeconds(),                 //秒
    "q+" : Math.floor((date.getMonth()+3)/3), //季度
    "S"  : date.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}

const aDate = new Date(2019, 7-1, 14);

it('2019年的总周数是：52（中国）', ()=>{
  expect(weekUtil.localWeeks(2019)).toBe(52)
})

it('2019年的当前周数是：28（中国）', ()=>{
  expect(weekUtil.curWeek(aDate)).toBe(28)
})

it('2019年的总周数是：52（美国）', ()=>{
  expect(weekUtilEn.localWeeks(2019)).toBe(52)
})

it('2019年的当前周数是：29（美国）', ()=>{
  expect(weekUtilEn.curWeek(aDate)).toBe(29)
})

it('2019年第28周的第一天（星期一）是：2019-07-08（中国）', ()=>{
  expect(format(weekUtil.getWeekDate(2019, 28).weekStart)).toBe('2019-07-08')
})

it('2019年第28周的最后一天（星期日）是：2019-07-14（中国）', ()=>{
  expect(format(weekUtil.getWeekDate(2019, 28).weekEnd)).toBe('2019-07-14')
})

it('2019年第28周的第一天（星期日）是：2019-07-07（美国）', ()=>{
  expect(format(weekUtilEn.getWeekDate(2019, 28).weekStart)).toBe('2019-07-07')
})

it('2019年第28周的最后一天（星期六）是：2019-07-13（美国）', ()=>{
  expect(format(weekUtilEn.getWeekDate(2019, 28).weekEnd)).toBe('2019-07-13')
})

it('2020年第1周的第一天（星期一）是：2019-12-29（美国）', ()=>{
  expect(format(weekUtilEn.getWeekDate(2020, 1).weekStart)).toBe('2019-12-29')
})

it('2020年第1周的第一天（星期一）是：2020-01-04（美国）', ()=>{
  expect(format(weekUtilEn.getWeekDate(2020, 1).weekEnd)).toBe('2020-01-04')
})
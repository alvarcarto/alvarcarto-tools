const _ = require('lodash');
const holidays = require('finnish-holidays-js');

function pad(str) {
  return _.padStart(str, 2, '0');
}

const currentYear = (new Date()).getFullYear();
const years = _.range(currentYear - 1, currentYear + 5);
const arrOfArrs = _.map(years, y => holidays.year(y));
const allYearsHolidays = _.flatten(_.map(arrOfArrs, (singleYearHolidays) => {
  return _.map(singleYearHolidays, obj => `${obj.year}-${pad(obj.month)}-${pad(obj.day)}`);
}));


//console.log(JSON.stringify(allYearsHolidays, null, 2))
_.forEach(allYearsHolidays, holidayStr => console.log(holidayStr))

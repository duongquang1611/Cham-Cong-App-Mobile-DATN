import moment, {duration} from 'moment';

export const FORMAT_HH_MM_DATE_VN = 'HH:mm DD/MM/YYYY';
export const FORMAT_DATE_YYYY_MM_DD = 'YYYY/MM/DD';
export const FORMAT_DATE_VN = 'DD/MM/YYYY';
export const FORMAT_DATE_VN_CC = 'DD-MM-YYYY';
export const FORMAT_DATE = 'YYYY-MM-DD';
export const FORMAT_DD_MM_YYY_HH_MM_SS = 'DD/MM/YYYY HH:mm:ss';
export const FORMAT_TIME_DIFF = 'HH:mm:ss';
export const FORMAT_TIME_DIFF_SPACE = 'HH : mm : ss';
export const DEFAULT_TIME = '--h : --m : --s';
export const FORMAT_NONE_TIME_HHMMSS = '-- : -- : --';
////////////////////////////////////////////////////////////

export const convertTimeDate = (valueDate, format) => {
  return moment(valueDate).format(format);
};

export const dateTimeNowFormat = (format) => {
  return convertTimeDate(new Date(), format);
};

/**
 * So sanh ngay voi ngay
 * @param {} date1
 * @param {*} date2
 */
export const checkDateAfterDateNow = (valueDate) => {
  return checkDateAfterDate(
    valueDate,
    dateTimeNowFormat(FORMAT_DATE_VN),
    FORMAT_DATE,
    FORMAT_DATE_VN,
  );
};
export const isDateBeforeDateNow = (valueDate) => {
  return checkDateAfterDate(
    dateTimeNowFormat(FORMAT_DATE_VN),
    valueDate,
    FORMAT_DATE_VN,
    FORMAT_DATE_YYYY_MM_DD,
  );
};

export const checkDateAfterDate = (
  valueDate1,
  valueDate2,
  formatDate1,
  formarDate2,
) => {
  var momentA = moment(valueDate1, formatDate1, true).format();
  var momentB = moment(valueDate2, formarDate2, true).format();

  if (momentA > momentB) return 1;
  else if (momentA < momentB) return -1;
  else return 0;
};

export const inNumberOfDayDiff = (date1, date2, format) => {
  let todaysDate = moment(date1);
  let fromDate = moment(date2);
  var diffDays = fromDate.diff(todaysDate, 'days');
  return diffDays + 1;
};

export const getCurrentDate = () => {
  return moment().format(FORMAT_DATE);
};

export const dateFromCurrenDate = (numberDay) => {
  return moment().add(numberDay, 'days').format(FORMAT_DATE);
};

const pad = (num) => {
  return ('0' + num).slice(-2);
};
export const convertSecondToHHmmss = (seconds) => {
  // duration: milisecond

  let convert = '';

  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  let hours = Math.floor(minutes / 60);
  minutes = minutes % 60;

  convert = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

  // convert = pad(hours)+":"+pad(minutes)+":"+pad(seconds); // for old browsers
  return convert;
};

export const getDayMonthYear = (date = new Date(), showFull = true) => {
  let dateFormat = moment(date);
  let day = dateFormat.format('D');
  let month = dateFormat.format('M');
  let year = dateFormat.format('YYYY');
  if (showFull) {
    return {
      day,
      month,
      year,
    };
  } else {
    return {
      month,
      year,
    };
  }
};

export const getDiffTime = (date1, date2 = new Date()) => {
  // date full
  if (!date1) return '';
  let diff = moment
    .utc(moment(new Date(date2), 'HH:mm:ss').diff(date1))
    .format(FORMAT_TIME_DIFF);
  // console.log('getDiffTime:', date1, date2, diff);
  return diff;
};

export const setTimeToDate = (time, date = new Date()) => {
  // date: format ISOString, exam: 2020-11-06T10:18:33.145Z
  // time: HH:mm:ss
  // console.log(time);
  let pieces = time.split(':');
  let hour = 0,
    minute = 0,
    second = 0;
  if (pieces.length === 3) {
    hour = parseInt(pieces[0], 10);
    minute = parseInt(pieces[1], 10);
    second = parseInt(pieces[2], 10);
  }
  date.setSeconds(second);
  date.setMinutes(minute);
  date.setHours(hour);
  return date;
};

export const rangeTimeDate = (date1, date2) => {
  return new Date(date1).getTime() - new Date(date2).getTime();
};

export const isBeforeDate = (date1, date2 = new Date()) => {
  let check = rangeTimeDate(date1, date2);
  return check < 0;
};
export const isPastTime = (date1, date2 = new Date()) => {
  if (date1 < date2) {
    return true;
  }
  return false;
};

export const isPreviousDay = (date1) => {
  let date2 = new Date();
  date2.setDate(date2.getDate() - 1);

  return isPastTime(date1, date2);
};

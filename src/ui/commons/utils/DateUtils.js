import Moment from 'moment';

export const FORMAT_HH_MM_DATE_VN = 'HH:mm DD/MM/YYYY';
export const FORMAT_DATE_YYYY_MM_DD = 'YYYY/MM/DD';
export const FORMAT_DATE_VN = 'DD/MM/YYYY';
export const FORMAT_DATE = 'YYYY-MM-DD';
export const FORMAT_DD_MM_YYY_HH_MM_SS = 'DD/MM/YYYY HH:mm:ss';

////////////////////////////////////////////////////////////

export const convertTimeDate = (valueDate, format) => {
  return Moment(valueDate).format(format);
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
  var momentA = Moment(valueDate1, formatDate1, true).format();
  var momentB = Moment(valueDate2, formarDate2, true).format();

  if (momentA > momentB) return 1;
  else if (momentA < momentB) return -1;
  else return 0;
};

export const inNumberOfDayDiff = (date1, date2, format) => {
  let todaysDate = Moment(date1);
  let fromDate = Moment(date2);
  var diffDays = fromDate.diff(todaysDate, 'days');
  return diffDays + 1;
};

export const getCurrentDate = () => {
  return Moment().format(FORMAT_DATE);
};

export const dateFromCurrenDate = (numberDay) => {
  return Moment().add(numberDay, 'days').format(FORMAT_DATE);
};

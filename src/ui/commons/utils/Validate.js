import phoneGoogle from 'google-libphonenumber';
const PNF = phoneGoogle.PhoneNumberFormat;
const phoneUtil = phoneGoogle.PhoneNumberUtil.getInstance();
import Toast from 'react-native-root-toast';

export function comparePhoneNumber(
  phoneNumber1,
  phoneNumber2,
  regionCode = 'VN',
) {
  if (!isValidPhoneNumber(phoneNumber1) || !isValidPhoneNumber(phoneNumber2)) {
    return false;
  }
  const number1 = phoneUtil.parseAndKeepRawInput(phoneNumber1, regionCode);
  const number2 = phoneUtil.parseAndKeepRawInput(phoneNumber2, regionCode);
  return number1.getNationalNumber() === number2.getNationalNumber();
}

export function isValidPhoneNumber(phoneNumber, regionCode = 'VN') {
  try {
    return !phoneNumber
      ? false
      : phoneUtil.isValidNumber(phoneUtil.parse(phoneNumber, regionCode));
  } catch (error) {
    return false;
  }
}

export function getPhoneNumber(phoneNumber, regionCode = 'VN') {
  if (!isValidPhoneNumber(phoneNumber, regionCode)) {
    Toast.show(`Số diện thoại ${phoneNumber} không tồn tại. Kiểm tra lại.`);
    return phoneNumber;
  }
  let prefix = '';
  if (regionCode === 'VN') {
    prefix = '0';
  }
  return (
    prefix +
    phoneUtil.parseAndKeepRawInput(phoneNumber, regionCode).getNationalNumber()
  );
}

/**
 *
 * @param {format theo quoc gia hien tai} phoneNumber
 */
export function formatPhoneNumberToNational(phoneNumber) {
  return formatPhoneNumber(phoneNumber, PNF.NATIONAL);
}

/**
 * Format theo dinh dang quoc te
 * @param {*} phoneNumber
 */
export function formatPhoneNumberToInternational(phoneNumber) {
  return formatPhoneNumber(phoneNumber, PNF.INTERNATIONAL);
}

/**
 * Format so dien thoai
 * @param {*} phoneNumber
 * @param {*} format
 */
export function formatPhoneNumber(phoneNumber, format, regionCode = 'VN') {
  if (!isValidPhoneNumber(phoneNumber)) {
    Toast.show(`Số diện thoại ${phoneNumber} không tồn tại. Kiểm tra lại.`);
    return;
  }
  return phoneUtil.format(phoneUtil.parse(phoneNumber, regionCode), format);
}

export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email.toString().trim().toLowerCase());
}

// check is image
export function isImage(url) {
  return (
    url.match(
      /(\.jpeg|jpg|gif|png|tiff|psd|raw|pdf|eps|ai|indd|exif|bmp)$|images|image|photo|photos|picture|pictures/,
    ) != null
  );
}

export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

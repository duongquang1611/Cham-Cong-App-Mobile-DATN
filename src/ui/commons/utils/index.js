import * as Base64 from './ConvertBase64';
import * as DateUtils from './DateUtils';
import * as ValidateUtils from './Validate';
import * as ConvertMoney from './ConvertMoney';
// import Networking from './../../networking';
import commons from '..';
import {NativeModules, Platform} from 'react-native';

// const validateImageUri = (url, isAvatar = false) => {
//   if (url) {
//     if (url.includes('localhost')) {
//       // path gom localhost, thay localhost = baseUrl
//       return Networking.BASE_URL + url.substring(21);
//     }
//     return url.includes('http')
//       ? url
//       : url.includes(commons.defaultAvatar)
//       ? Networking.BASE_URL + commons.defaultAvatar
//       : Networking.IMAGE_BASE_URL + url;
//   } else if (isAvatar) {
//     return Networking.BASE_URL + commons.defaultAvatar;
//   }
//   return null;
// };

// const validateUrlAPI = (url) => {
//   if (url) {
//     return url.includes('http') ? url : Networking.BASE_URL + url;
//   }
//   return null;
// };
const eraseCharacterVietnamese = (str) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  // Combining Diacritical Marks
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // huyền, sắc, hỏi, ngã, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); //mũ â (ê), mũ ă, mũ ơ (ư)
  return str;
};

const eraseCharacterVietnameseToLowerCase = (str) => {
  str = str.trim();
  str = str.replace(
    /à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ|À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g,
    'a',
  );
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ|È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ|Ì|Í|Ị|Ỉ|Ĩ/g, 'i');
  str = str.replace(
    /ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ|Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g,
    'o',
  );
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ|Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ|Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'y');
  str = str.replace(/đ|Đ/g, 'd');
  // Combining Diacritical Marks
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // huyền, sắc, hỏi, ngã, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); //mũ â (ê), mũ ă, mũ ơ (ư)
  return str.toLowerCase();
};

function convertToArray(objectsArray) {
  let copyOfJsonArray = Array.from(objectsArray);
  let jsonArray = JSON.parse(JSON.stringify(copyOfJsonArray));
  return jsonArray;
}

export function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

function findUrl(text) {
  // let regex = /(http|https|ftp|ftps)\:\/\/[-a-zA-Z0-9@:%._\+~#=]+\.[a-zA-Z]{2,3}(\/\S*)?/g;
  let text1 = text.replace(',', '');
  if (!text) return '';
  let regex = /(^|\s)((http|https|ftp|ftps)?:\/\/)?(www\.)?[-a-zA-Z0-9@:%.,_\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.,~#?&//=]*)($|\s)/g;
  let match;
  let result = '';
  let lastIndex = 0;
  while ((match = regex.exec(text)) != null) {
    result += text.substring(lastIndex, match.index);
    let url = match[0].trim();
    if (match[0].length > 30) {
      result += `<a href="${url}" target="_blank">${url.substring(
        0,
        20,
      )}...${url.substring(url.length - 7, url.length)}</a>`;
    } else {
      result += `<a href="${url}" target="_blank">${url}</a>`;
    }
    lastIndex = match.index + match[0].length;
  }
  result += text.substring(lastIndex, text.length);
  return findByPhoneNumber(result);
}

function findByPhoneNumber(text) {
  // let regex = /(http|https|ftp|ftps)\:\/\/[-a-zA-Z0-9@:%._\+~#=]+\.[a-zA-Z]{2,3}(\/\S*)?/g;
  let regex = /(^|\s)(0([-., ]?[0-9]{1}){9,10}[-., ]?)($|\s)/g;
  let match;
  let result = '';
  let lastIndex = 0;
  while ((match = regex.exec(text)) != null) {
    let phoneNumber = match[0];
    result += text.substring(lastIndex, match.index);
    result += `<a href="tel:${phoneNumber.replace(
      ' ',
      '',
    )}" target="_blank">${phoneNumber}</a>`;
    lastIndex = match.index + match[0].length;
  }
  result += text.substring(lastIndex, text.length);
  return result;
}

function getImageFromHTML(text) {
  if (text.includes('src="')) {
    try {
      let text1 = text.substring(text.indexOf('src="'), text.length);
      let text2 = text1.substring(5, text1.length);
      let text3 = text2.substring(0, text2.indexOf('"'));

      return text3;
    } catch (error) {}
  }
  return '';
}

function convertKFormatter(num) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
    : Math.sign(num) * Math.abs(num);
}

function formatNumberWithMetricPrefix(num, digits) {
  var si = [
    {value: 1, symbol: ''},
    {value: 1e3, symbol: 'k'},
    {value: 1e6, symbol: 'Tr'},
    {value: 1e9, symbol: 'Tỉ'},
    {value: 1e12, symbol: 'T'},
    {value: 1e15, symbol: 'P'},
    {value: 1e18, symbol: 'E'},
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
}

// check is image
function isImage(url) {
  return (
    url.match(
      /(\.jpeg|jpg|gif|png|tiff|psd|raw|pdf|eps|ai|indd|exif|bmp)$|images|image|photo|photos|picture|pictures/,
    ) != null
  );
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = degToRad(lat2 - lat1); // degToRad below
  var dLon = degToRad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(lat1)) *
      Math.cos(degToRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km

  // round distance
  d = Number(d.toFixed(1));
  return d;
}
function degToRad(deg) {
  return deg * (Math.PI / 180);
}

//Doi vi tri cua 1 phan tu trong array
function changePositionItemInArray(arr, from, to) {
  let cutOut = arr.splice(from, 1)[0]; // cut the element at index 'from'
  arr.splice(to, 0, cutOut); // insert it at index 'to'
  return arr;
}
function convertObjToArrWithoutKey(obj) {
  let result = Object.keys(obj).map((key) => obj[key]);
  return result;
}
function replaceMultiSpaceToSingle(text) {
  return text.replace(/  +/g, ' ');
}

function getDeviceLanguage(full = true) {
  const deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
      : NativeModules.I18nManager.localeIdentifier;
  return full ? deviceLanguage : deviceLanguage.substring(0, 2);
}

function uppercaseFirstLetter(text, eachWord = false) {
  if (eachWord) {
    let splitText = text.toLowerCase().split(' ');
    for (let i = 0; i < splitText.length; i++) {
      splitText[i] =
        splitText[i].charAt(0).toUpperCase() + splitText[i].substring(1);
    }
    return splitText.join(' ');
  } else return text.charAt(0).toUpperCase() + text.slice(1);
}

const compareIpAddress = (ip1 = '', ip2 = '') => {
  let indexLastDot1 = ip1.lastIndexOf('.');
  let indexLastDot2 = ip2.lastIndexOf('.');
  let subIp1 = ip1.slice(0, indexLastDot1);
  let subIp2 = ip2.slice(0, indexLastDot2);
  return subIp1 === subIp2;
};

const utils = {
  ...ValidateUtils,
  ...DateUtils,
  ...Base64,
  ...ConvertMoney,
  findUrl,
  getImageFromHTML,
  findByPhoneNumber,
  convertToArray,
  // validateImageUri,
  // validateUrlAPI,
  eraseCharacterVietnamese,
  eraseCharacterVietnameseToLowerCase,
  convertKFormatter,
  formatNumberWithMetricPrefix,
  isImage,
  getDistanceFromLatLonInKm,
  changePositionItemInArray,
  convertObjToArrWithoutKey,
  replaceMultiSpaceToSingle,
  getDeviceLanguage,
  uppercaseFirstLetter,
  compareIpAddress,
};

export default utils;

export function convertMoney(money = 0, currency = 'VND') {
  if (money >= 950000000)
    return roundWithFloatPoint(money / 1000000000) + ' tỷ ' + currency;
  else if (money >= 950000 && money < 950000000)
    return roundWithFloatPoint(money / 1000000) + ' triệu ' + currency;
  else if (money >= 95000 && money < 950000)
    return roundWithFloatPoint(money / 100000) + ' trăm nghìn ' + currency;
  else if (money >= 950 && money < 95000)
    return roundWithFloatPoint(x / 1000) + ' nghìn ' + currency;
  else return money + ' ' + currency;
}

function roundWithFloatPoint(value, precision = 1) {
  var multiplier = Math.pow(10, precision);
  return Math.round(value * multiplier) / multiplier;
}

export function convertMoneyByCurrency2(number, currency = 'VND') {
  let formatMoney = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: currency,
  }).format(number);
  return formatMoney;
}
export function convertMoneyByCurrency(number, currency) {
  let formatCurrency = {};
  if (currency) {
    formatCurrency = {
      style: 'currency',
      currency: currency,
    };
  }
  let formatMoney = number.toLocaleString('en-IN', formatCurrency);

  return formatMoney;
}

export function convertMoneyWithoutCurrency(number) {
  let format = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return format;
}
export function removeSpecialChar(char, data) {
  let regex = new RegExp(`\\${char}`, 'g');
  return data.replace(regex, '');
}
export function restrictSpecialCharacter(text) {
  let regex = /[^0-9]/gi;
  return text.replace(regex, '');
}

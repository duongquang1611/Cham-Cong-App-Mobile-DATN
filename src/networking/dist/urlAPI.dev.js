"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var env = 'dev'; // beta/prod

var config = {
  dev: {
    keyAsyncStorageBaseUrl: '@base_url',
    // local
    // BASE_API_URL: 'http://localhost:5000/api/',
    // BASE_URL: 'http://localhost:5000/',
    baseApiUrlHeroku: 'https://cham-cong.herokuapp.com/api/',
    // ngrok
    BASE_API_URL: 'http://8898b96da36d.ngrok.io/api/',
    BASE_URL: 'http://8898b96da36d.ngrok.io/',

    // heroku
    // BASE_API_URL: `${baseUrlHeroku}/api/`,
    // BASE_URL: baseUrlHeroku,
    set setServer(baseUrl) {
      console.log('setsetupServer -> this', baseUrl);
      this.BASE_API_URL = baseUrl + 'api/';
      this.BASE_URL = baseUrl;
    },

    get getServer() {
      return {
        BASE_URL: this.BASE_URL,
        BASE_API_URL: this.BASE_API_URL
      };
    },

    // users
    searchUsers: 'users',
    signup: 'auth/signup',
    signin: 'auth/signin',
    detailUser: function detailUser(id) {
      return "users/".concat(id);
    },
    searchCompanies: 'companies',
    detailCompany: function detailCompany(id) {
      return "companies/".concat(id);
    },
    configCompany: 'companies/config',
    workDay: 'work-day',
    // list work day: get, update workDay: put, checkout thi them isCheckout: true
    workDayCompany: function workDayCompany(companyId) {
      return "work-day/company/".concat(companyId);
    },
    askComeLeave: 'work-day/ask-come-leave',
    // put, chua co thi tao moi
    dayOff: 'work-day/day-off',
    // get, put
    upload: 'upload'
  }
};
var urlAPI = config[env];
var _default = urlAPI;
exports["default"] = _default;